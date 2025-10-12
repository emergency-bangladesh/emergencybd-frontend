'use client'
import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Loader } from './ui/loader'
import Muted from './ui/typography/muted'
import { useAuth } from '@/features/auth/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useVolunteerQuery } from '@/queries/use-volunteer-query'
import { volunteerProfilePicUrl } from '@/actions/volunteer'

function VolunteerNavGroup({ uuid }: { uuid: string }) {
  const { data: volunteer } = useVolunteerQuery(uuid)

  console.log({ volunteer })

  return (
    <>
      <DropdownMenuItem asChild>
        <Link to="/volunteer/$uuid" params={{ uuid }}>
          Volunteer Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          <Muted>Team</Muted>
        </DropdownMenuLabel>
        {volunteer?.teamInformation ? (
          <DropdownMenuItem asChild>
            <Link
              to="/team/$uuid"
              params={{ uuid: volunteer.teamInformation.teamUuid }}
            >
              {volunteer.teamInformation.teamName}
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/team/create">Create Team</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>
          <Muted>Settings</Muted>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link to="/settings/update-information">Update Information</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings/change-password">Change Password</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  )
}

export function UserNav() {
  const { user, logout, isLoading } = useAuth()

  if (isLoading) return <Loader />
  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full hover:bg-accent"
        >
          <Avatar className="h-8 w-8">
            {user.type === 'volunteer' && (
              <AvatarImage
                src={volunteerProfilePicUrl(user.uuid)}
                alt={user.name}
              />
            )}
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-2 shadow-xs"
        align="end"
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-foreground">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.type === 'volunteer' ? (
          <VolunteerNavGroup uuid={user.uuid} />
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <Muted>Settings</Muted>
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to="/settings/change-password">Change Password</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <Muted>Issues</Muted>
          </DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link to="/issues/new">Create Issue</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
