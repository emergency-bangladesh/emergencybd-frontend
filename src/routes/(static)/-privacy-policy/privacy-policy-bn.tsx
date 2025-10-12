import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function PrivacyPolicyBn() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg border-none bg-background">
        <CardHeader className="p-0!">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            ইমারজেন্সি বাংলাদেশ এর গোপনীয়তা নীতি
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            কার্যকরী তারিখ:{' '}
            <span className="text-primary font-medium">৩০ সেপ্টেম্বর ২০২৫</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed p-0!">
          <p>
            Emergency BD (“আমরা”, “আমাদের”) আপনার গোপনীয়তা রক্ষায়
            অঙ্গীকারবদ্ধ। এই প্রাইভেসি পলিসিতে আমরা কী ধরনের ব্যক্তিগত তথ্য
            সংগ্রহ করি, কীভাবে তা ব্যবহার করি, এবং কীভাবে আপনার তথ্য নিরাপদ
            রাখি, তা ব্যাখ্যা করা হয়েছে। আপনি যখন Emergency BD অ্যাপ (এরপর থেকে
            “অ্যাপ”) ব্যবহার করেন, তখন আপনি এই নীতিমালার শর্তাবলীতে সম্মতি
            প্রদান করেন।
          </p>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">
              ১. আমরা যে তথ্য সংগ্রহ করি
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">ব্যক্তিগত তথ্য:</span> আপনার নাম,
                ফোন নম্বর, ইমেল ঠিকানা, রক্তের গ্রুপ, জাতীয় পরিচয়পত্র বা জন্ম
                সনদ নম্বর, এবং অবস্থান সংক্রান্ত তথ্য অন্তর্ভুক্ত থাকতে পারে।
              </li>
              <li>
                <span className="font-medium">জরুরি তথ্য:</span> রক্তের
                প্রয়োজন, হারানো-বিজ্ঞপ্তি, বা অন্যান্য সংকটসংক্রান্ত তথ্য।
              </li>
              <li>
                <span className="font-medium">অবস্থান তথ্য:</span> আপনার
                সম্মতিতে, স্থানভিত্তিক সেবা প্রদানের জন্য আমরা আপনার অবস্থান
                তথ্য সংগ্রহ করতে পারি।
              </li>
              <li>
                <span className="font-medium">ব্যবহার সম্পর্কিত তথ্য:</span>{' '}
                আপনি কীভাবে অ্যাপ ব্যবহার করছেন, যেমন ডিভাইস তথ্য, আইপি ঠিকানা,
                এবং ব্যবহার প্যাটার্ন ইত্যাদি।
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              ২. আমরা কীভাবে আপনার তথ্য ব্যবহার করি
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>জরুরি অনুরোধ এবং সংকট সহায়তার মতো সেবা প্রদানের জন্য।</li>
              <li>
                জরুরি অবস্থা, রিসোর্স, এবং আপডেট সম্পর্কিত নোটিফিকেশন পাঠানোর
                জন্য।
              </li>
              <li>
                আপনার সঙ্গে যোগাযোগ রাখার জন্য, যার মধ্যে গ্রাহক সহায়তাও
                অন্তর্ভুক্ত।
              </li>
              <li>ব্যবহার ডেটা বিশ্লেষণের মাধ্যমে অ্যাপ উন্নত করার জন্য।</li>
              <li>আইনগত বাধ্যবাধকতা পূরণের জন্য।</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              ৩. আমরা কার সঙ্গে আপনার তথ্য শেয়ার করি
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">সেবা প্রদানকারীদের সঙ্গে: </span>{' '}
                হোস্টিং, যোগাযোগ, এবং পেমেন্ট প্রসেসিং-এর উদ্দেশ্যে।
              </li>
              <li>
                <span className="font-medium">
                  জরুরি প্রতিক্রিয়াদাতাদের সঙ্গে:
                </span>{' '}
                স্বাস্থ্যসেবা প্রদানকারী ও কর্তৃপক্ষকে সহায়তা করতে।
              </li>
              <li>
                <span className="font-medium">আইনগত কারণে:</span> আইন অনুযায়ী
                বা বৈধ অনুরোধের প্রেক্ষিতে।
              </li>
              <li>
                <span className="font-medium">আপনার সম্মতিতে:</span> যখন আপনি
                স্পষ্টভাবে অনুমতি প্রদান করেন।
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">৪. তথ্য সংরক্ষণ</h2>
            <p>
              আমরা আপনার ব্যক্তিগত তথ্য কেবল প্রয়োজনীয় বা আইনগতভাবে
              বাধ্যতামূলক সময় পর্যন্ত সংরক্ষণ করি। জরুরি সংক্রান্ত তথ্য
              কার্যক্রমের প্রয়োজনে আরও দীর্ঘ সময় সংরক্ষিত থাকতে পারে।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">৫. তথ্যের নিরাপত্তা </h2>
            <p>
              আমরা আপনার ডেটা সুরক্ষায় শিল্পমানের নিরাপত্তা ব্যবস্থা ব্যবহার
              করি। তবে, ইন্টারনেটের মাধ্যমে তথ্য প্রেরণ বা সংরক্ষণের কোনো
              পদ্ধতিই ১০০% নিরাপদ নয়; তাই আমরা সম্পূর্ণ নিরাপত্তা নিশ্চয়তা
              দিতে পারি না।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              ৬. আপনার ডেটা সুরক্ষা অধিকার{' '}
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-medium">অ্যাক্সেস:</span> আপনার তথ্য দেখার
                অনুরোধ করতে পারেন।
              </li>
              <li>
                <span className="font-medium">সংশোধন: </span> ভুল তথ্য সংশোধনের
                অনুরোধ করতে পারেন।
              </li>
              <li>
                <span className="font-medium">মুছে ফেলা: </span> আইনগত সীমার
                মধ্যে ব্যক্তিগত তথ্য মুছে ফেলার অনুরোধ করতে পারেন।
              </li>
              <li>
                <span className="font-medium">অপ্ট-আউট:</span> বিপণন বা
                অপ্রয়োজনীয় নোটিফিকেশন বন্ধ করতে পারেন।
              </li>
              <li>
                <span className="font-medium">ডেটা পোর্টেবিলিটি:</span> আপনার
                তথ্য একটি সংগঠিত ফরম্যাটে কপি হিসেবে চাওয়ার অধিকার আছে।
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              ৭. তৃতীয় পক্ষের লিঙ্ক
            </h2>
            <p>
              অ্যাপে তৃতীয় পক্ষের ওয়েবসাইট বা সেবার লিঙ্ক থাকতে পারে। তাদের
              গোপনীয়তা নীতির জন্য আমরা দায়ী নই, এবং তাদের নীতি পর্যালোচনা করার
              পরামর্শ দিই।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">৮. শিশুদের গোপনীয়তা</h2>
            <p>
              আমাদের সেবা ১৩ বছরের কম বয়সী শিশুদের জন্য নয়। আমরা সচেতনভাবে
              তাদের কাছ থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না। ১৮ বছরের কম বয়সীদের
              অ্যাকাউন্টে পিতামাতার নিয়ন্ত্রণ থাকতে পারে। যদি আপনি মনে করেন যে
              আমরা ভুলবশত কোনো শিশুর তথ্য সংগ্রহ করেছি, তাহলে দয়া করে আমাদের
              সঙ্গে যোগাযোগ করুন।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              ৯. এই প্রাইভেসি পলিসিতে পরিবর্তন
            </h2>
            <p>
              আমরা সময়ে সময়ে এই প্রাইভেসি পলিসি আপডেট করতে পারি। পরিবর্তনগুলো
              এই পৃষ্ঠায় প্রকাশ করা হবে এবং কার্যকর তারিখ সংশোধন করা হবে।
              নিয়মিতভাবে এই পৃষ্ঠা পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">১০. যোগাযোগ করুন</h2>
            <p>
              এই প্রাইভেসি পলিসি সম্পর্কে আপনার যদি কোনো প্রশ্ন থাকে, তাহলে
              আমাদের সঙ্গে যোগাযোগ করুন:{' '}
              <a
                href="mailto:project.emergencybd@gmail.com"
                className="text-destructive hover:underline"
              >
                project.emergencybd@gmail.com
              </a>{' '}
              অথবা আমাদের সামাজিক যোগাযোগ মাধ্যমের মাধ্যমে।
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
