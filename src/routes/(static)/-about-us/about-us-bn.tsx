import {
  IconClipboardList,
  IconClock,
  IconGlobe,
  IconHeart,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUsBn() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <Badge variant="secondary">Emergency BD</Badge>
          <Badge className="uppercase">Trusted · Fast · Local</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-primary">Emergency BD</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          জরুরী পরিস্থিতিতে সাড়া প্রদান এবং সংকট ব্যবস্থাপনায় আপনার নির্ভরযোগ্য অংশীদার — যখন
          প্রতিটি সেকেন্ড মূল্যবান, তখন দ্রুত, সুসংগঠিত সাহায্য।
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button variant="default" size="lg" className="w-full sm:w-auto">
            <Link to="/issues/new">এখন সাহায্য নিন</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent"
            asChild
          >
            <Link to="/registration/volunteer/personal-information">
              স্বেচ্ছাসেবক হোন
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        {/* WHAT WE COVER */}
        <section className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
          <Card>
            <CardContent className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted shrink-0">
                    <IconHeart className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    রক্ত সংগ্রহ এবং ব্যবস্থাপনা
                  </h3>
                </div>
                <Badge className="self-start sm:self-auto">সংকটপূর্ণ</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                গুরুত্বপূর্ণ রোগীদের যেন রক্তের অভাবে কষ্ট পেতে না হয়, তার জন্য রক্তদাতা এবং
                রক্তের প্রয়োজনীয়তাগুলিতে দ্রুত অ্যাক্সেসকে সহজ করে।
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted shrink-0">
                    <IconSearch className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    নিখোঁজ &amp; খুঁজে পাওয়া
                  </h3>
                </div>
                <Badge className="self-start sm:self-auto">কমিউনিটি</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                সুসংগঠিত, অনুসন্ধানযোগ্য পোস্ট এবং স্থানীয় সমন্বয়ের মাধ্যমে হারিয়ে যাওয়া ব্যক্তি
                এবং জিনিসপত্র তাদের মালিকের কাছে ফিরিয়ে দেয়।
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted shrink-0">
                    <IconClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    দুর্যোগ ব্যবস্থাপনা
                  </h3>
                </div>
                <Badge className="self-start sm:self-auto">সমন্বয়</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                জরুরী পরিষেবাগুলিতে যোগাযোগ ও অ্যাক্সেস সুবিন্যস্ত করার জন্য একটি প্ল্যাটফর্ম —
                যা প্রতিক্রিয়ার সময় এবং সম্পদের বরাদ্দকে উন্নত করে।
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* UNIQUE APPROACH */}
        <section className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              আমাদের অনন্য উদ্যোগ
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              বাংলাদেশে জরুরি পরিষেবা ব্যবস্থাগুলো খণ্ড খণ্ড এবং সমন্বয় প্রায়শই অসঙ্গত।
              Emergency BD একটি সুবিন্যস্ত, সংযুক্ত নেটওয়ার্ক তৈরি করে যা মানুষ, স্বেচ্ছাসেবক
              এবং পরিষেবাগুলিকে একসাথে যুক্ত করে — জীবন বিপন্ন হওয়ার সময়কার বাধাগুলি হ্রাস
              করে।
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded bg-muted shrink-0">
                  <IconGlobe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">
                    স্থানীয়রা প্রথমে
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    বাংলাদেশী সম্প্রদায়, নগর ও গ্রামীণ — উভয়ের জন্যই নির্মিত।
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded bg-muted shrink-0">
                  <IconUsers className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">
                    কমিউনিটি দ্বারা পরিচালিত
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    স্বেচ্ছাসেবক, হাসপাতাল এবং নাগরিকরা একসাথে কাজ করে।
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded bg-muted shrink-0">
                  <IconClock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base">
                    দ্রুত প্রতিক্রিয়া
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    দ্রুত সাহায্য সংযোগের জন্য অপটিমাইজ করা প্রক্রিয়া।
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <Card className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              এই কিছু কেন গুরুত্বপূর্ণ
            </CardTitle>
            <CardContent className="px-0">
              <p className="text-sm text-muted-foreground">
                অনেক জরুরী পরিস্থিতিতে প্রতিটি সেকেন্ড মূল্যবান। আমাদের হালকা
                (lightweight) সরঞ্জামগুলি রক্ত, স্বেচ্ছাসেবক বা জরুরি পরিষেবা খুঁজে বের করার
                সময় হ্রাস করে, এবং সংকটে থাকা নাগরিকদের জন্য পরবর্তী স্পষ্ট পদক্ষেপ সরবরাহ
                করে।
              </p>

              <div className="mt-4 sm:mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">সক্রিয় ব্যবস্থা</span>
                  <span className="text-sm font-medium">
                    দেশব্যাপী (সম্প্রসারণশীল)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">প্ল্যাটফর্ম</span>
                  <span className="text-sm font-medium">
                    ওয়েব রেডি • মোবাইল রেডি
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">প্রাথমিক ব্যবহারকারী</span>
                  <span className="text-sm font-medium text-right">
                    সকল নাগরিক, স্বেচ্ছাসেবক, হাসপাতাল
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* MISSION & TARGET AUDIENCE */}
        <section className="grid gap-6 sm:gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              আমাদের উদ্দেশ্য
            </h2>
            <p className="text-base sm:text-lg font-semibold text-muted-foreground">
              বাংলাদেশে সংকট ব্যবস্থাপনায় বিপ্লব আনা — যখন প্রতিটি সেকেন্ড মূল্যবান।
            </p>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              আমরা নাগরিকদের সাহায্য পেতে ও দিতে একটি নির্ভরযোগ্য, সহজে ব্যবহারযোগ্য
              সিস্টেম দিয়ে হতাশা ও বিলম্ব দূর করি।
            </p>

            <div className="mt-4 sm:mt-6 space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <Badge className="shrink-0">উদ্দেশ্য</Badge>
                <p className="text-sm text-muted-foreground">
                  একটি নিরাপদ, সংযুক্ত বাংলাদেশ যেখানে সাহায্য মাত্র এক ক্লিক দূরে।
                </p>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <Badge className="shrink-0">লক্ষ্য</Badge>
                <p className="text-sm text-muted-foreground">
                  জরুরী পরিস্থিতিতে প্রতিটি নাগরিককে সহায়তা করা।
                </p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                আমাদের টার্গেট অডিয়েন্স
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                বাংলাদেশ জুড়ে যারা ল্যাপটপ বা স্মার্টফোন ব্যবহার করেন — শহরের হাসপাতাল থেকে
                প্রত্যন্ত গ্রাম পর্যন্ত। প্ল্যাটফর্মটি সহজ, কম ব্যান্ডউইথ উপযোগী এবং
                মোবাইল-রেডি করে ডিজাইন করা হয়েছে।
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">শহুরে নাগরিকেরা</strong>
                  <div className="text-xs text-muted-foreground">
                    হাসপাতাল, শিক্ষার্থী, যাত্রী
                  </div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">
                    গ্রামের নাগরিকেরা
                  </strong>
                  <div className="text-xs text-muted-foreground">
                    স্থানীয় স্বেচ্ছাসেবক, ক্লিনিক
                  </div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">স্বেচ্ছাসেবক</strong>
                  <div className="text-xs text-muted-foreground">
                    প্রশিক্ষিত সাড়াদানকারী ও সাহায্যকারী
                  </div>
                </div>
                <div className="p-3 rounded bg-muted">
                  <strong className="text-sm sm:text-base">হাসপাতাল</strong>
                  <div className="text-xs text-muted-foreground">
                    জরুরী ইউনিট ও ব্লাড ব্যাংক
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8 sm:my-12" />

        {/* CTA - LARGE */}
        <section className="bg-muted p-6 sm:p-8 rounded-lg text-center">
          <h3 className="text-xl sm:text-2xl font-bold">
            নিরাপদ বাংলাদেশ গড়তে আমাদের সাথে যুক্ত হন
          </h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            আমাদের কভারেজ সম্প্রসারণে সাহায্য করুন বা অবিলম্বে সহায়তা পান।
          </p>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/issues/new">এখন সাহায্য পান</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
              asChild
            >
              <Link to="/registration/volunteer/personal-information">
                স্বেচ্ছাসেবক হিসাবে যুক্ত হন
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
