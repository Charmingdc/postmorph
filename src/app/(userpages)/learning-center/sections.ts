import type { Section } from "./types";

const videoBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const sections: Section[] = [
  {
    title: "Introduction",
    lessons: [
      {
        title: "Welcome to Postmorph",
        blocks: [
          {
            type: "paragraph",
            value:
              "Welcome! In this lesson, I’ll walk you through what Postmorph is all about. You’ll see exactly how it works and how it can help you create more content with less effort."
          },
          {
            type: "video",
            src: `${videoBaseUrl}/storage/v1/object/public/Postmorph%20Public%20Assets/lv_0_20250919111125.mp4`
          },
          {
            type: "paragraph",
            value:
              "After watching, you’ll have a clear picture of how Postmorph saves time, increases your reach, and helps you stay consistent as a content creator."
          }
        ]
      }
    ]
  },
  {
    title: "Content Repurposing 101",
    lessons: [
      {
        title: "What is Content Repurposing?",
        blocks: [
          {
            type: "paragraph",
            value:
              "Content repurposing is the process of taking one piece of content and transforming it into multiple formats that work across different platforms. Instead of creating something new from scratch every single time, you adapt your original content into different versions that fit where your audience hangs out."
          },
          {
            type: "paragraph",
            value:
              "For example, let’s say you publish a blog post. That single blog could also become a Twitter thread, a LinkedIn post, a short video script, or even an infographic. You don’t need to reinvent the wheel—you just reshape what you already created so it lives longer and reaches more people."
          }
        ]
      },
      {
        title: "Why Repurpose Content?",
        blocks: [
          {
            type: "paragraph",
            value:
              "Creating content is hard. It takes time, energy, and creativity—and most of us can’t afford to pour hours into something that only gets seen once. That’s where repurposing becomes powerful."
          },
          {
            type: "paragraph",
            value:
              "Repurposing helps you multiply your reach. Different people prefer different formats: some read blogs, some scroll Twitter, some love TikTok videos, and others only check LinkedIn. By reshaping your message, you meet your audience wherever they are without starting from scratch each time."
          },
          {
            type: "paragraph",
            value:
              "It also saves time. Instead of writing ten separate pieces of content, you can turn one solid piece into ten variations. That means more consistency in your posting schedule without burning out."
          },
          {
            type: "paragraph",
            value:
              "There’s also an SEO and visibility boost. A single blog repurposed into multiple formats creates more entry points for people to discover your work. More posts, more impressions, more chances to be seen."
          },
          {
            type: "paragraph",
            value:
              "Finally, repurposing grows your authority faster. When people see you everywhere—sharing consistent ideas in different formats—you become memorable. You start showing up as the go-to person in your niche."
          },
          {
            type: "paragraph",
            value:
              "That’s exactly why I built Postmorph: to make this process effortless. Instead of manually copying, pasting, reformatting, and editing, Postmorph helps you repurpose in a few clicks."
          }
        ]
      },
      {
        title: "Examples of Repurposing",
        blocks: [
          {
            type: "paragraph",
            value:
              "Let’s look at some real-world examples so you can clearly see the power of repurposing:"
          },
          {
            type: "paragraph",
            value:
              "1. A blog post → turned into a Twitter thread, a LinkedIn article, and an Instagram carousel."
          },
          {
            type: "paragraph",
            value:
              "2. A podcast episode → cut into short video clips for TikTok, YouTube Shorts, and Instagram Reels."
          },
          {
            type: "paragraph",
            value:
              "3. A webinar or live stream → transformed into a highlight reel, key takeaway posts, and a step-by-step guide."
          },
          {
            type: "paragraph",
            value:
              "4. A long-form newsletter → repurposed into bite-sized tweets, quotes for graphics, and short video scripts."
          },
          {
            type: "paragraph",
            value:
              "With repurposing, you stop letting your hard work fade after one upload. Instead, every idea gets stretched, amplified, and seen by more people."
          }
        ]
      }
    ]
  },
  {
    title: "Repurposing Strategies",
    lessons: [
      {
        title: "Choosing the Right Formats",
        blocks: [
          {
            type: "paragraph",
            value:
              "Not every piece of content fits every format, and that’s okay. The key is matching your content to the platform and audience. For example, deep dives and thought leadership thrive on LinkedIn and blogs, while quick insights shine on Twitter."
          },
          {
            type: "paragraph",
            value:
              "When repurposing, ask: 'Where will this content perform best?' If your audience is visual, think carousels or videos. If they love quick ideas, go with tweets or short posts. Start with the format that feels natural to your message, then expand."
          },
          {
            type: "paragraph",
            value:
              "Here’s a simple rule I use: Long-form content should break down into snackable bites, while short-form content can be expanded into deeper dives."
          }
        ]
      },
      {
        title: "Tone and Style Adaptation",
        blocks: [
          {
            type: "paragraph",
            value:
              "Different platforms have different cultures. A LinkedIn post that sounds polished might feel out of place on Twitter, and a TikTok script written like a blog would feel stiff. Adapting your tone makes your repurposed content feel native."
          },
          {
            type: "paragraph",
            value:
              "On Twitter, keep it sharp, witty, and to the point. On LinkedIn, lean into storytelling and professional lessons. On Instagram, make it visual-first with captions that add context. On TikTok, focus on hooks and fast delivery."
          },
          {
            type: "paragraph",
            value:
              "The message is the same—you’re just dressing it differently for each platform so it feels like it belongs there."
          }
        ]
      },
      {
        title: "Building a Repurposing System",
        blocks: [
          {
            type: "paragraph",
            value:
              "Consistency is what grows an audience, and systems create consistency. Instead of repurposing randomly, set up a workflow you can repeat every time."
          },
          {
            type: "paragraph",
            value:
              "Here’s a simple system I recommend: Every time you create a long-form piece (blog, newsletter, or podcast), break it down into at least 5 short pieces. That could be tweets, quotes, graphics, or short clips. This is the 1:5 Rule: 1 big piece = 5 smaller ones."
          },
          {
            type: "paragraph",
            value:
              "You can batch this process: dedicate one day to creating your long-form content, and another to breaking it into smaller posts. Postmorph is designed to make this faster by giving you ready-to-use formats you can adapt instantly."
          }
        ]
      }
    ]
  },
  {
    title: "Case Studies",
    lessons: [
      {
        title: "Blogger → Social Media Domination",
        blocks: [
          {
            type: "paragraph",
            value:
              "Imagine you’re a blogger who publishes one in-depth article each week. Without repurposing, that article only reaches the people who read your blog. But with repurposing, that same article could become:"
          },
          {
            type: "paragraph",
            value:
              "- A Twitter thread summarizing the main takeaways\n- A LinkedIn post highlighting a story from the blog\n- An Instagram carousel with 5 key points\n- A short video where you explain one section face-to-camera"
          },
          {
            type: "paragraph",
            value:
              "Now, instead of your hard work living in one corner of the internet, it’s spread across multiple platforms, each tailored to the audience there."
          }
        ]
      },
      {
        title: "Podcaster → Multi-Platform Creator",
        blocks: [
          {
            type: "paragraph",
            value:
              "Podcasts are powerful but often underutilized. A single episode could be transformed into a week’s worth of content. For example:"
          },
          {
            type: "paragraph",
            value:
              "- 3 short clips from key moments for TikTok or YouTube Shorts\n- Quote graphics for Instagram and LinkedIn\n- A blog post recap of the episode\n- A Twitter thread sharing highlights"
          },
          {
            type: "paragraph",
            value:
              "This not only brings your podcast to people who prefer reading or watching, but it also promotes your episodes in multiple places."
          }
        ]
      },
      {
        title: "Solo Founder → Thought Leader",
        blocks: [
          {
            type: "paragraph",
            value:
              "Let’s say you write a weekly newsletter about your journey as a solo founder. Instead of leaving it at that, you could repurpose it into:"
          },
          {
            type: "paragraph",
            value:
              "- A LinkedIn post sharing a personal story from the newsletter\n- A Twitter thread breaking down one lesson\n- A short video expanding on one point\n- A carousel summarizing the whole newsletter"
          },
          {
            type: "paragraph",
            value:
              "Over time, your audience sees your insights everywhere. You’re not just publishing—you’re building authority as someone who consistently shares value across platforms."
          }
        ]
      }
    ]
  },
  {
    title: "Next Steps",
    lessons: [
      {
        title: "Advanced Tips",
        blocks: [
          {
            type: "paragraph",
            value:
              "Once you’re comfortable with the basics, it’s time to level up. Here are a few advanced tips that will make your repurposing even smoother:"
          },
          {
            type: "paragraph",
            value:
              "- Batch-create content: Work on multiple repurposed pieces in one sitting.\n- Use templates: Create reusable formats for threads, carousels, or scripts.\n- Track performance: See which repurposed formats drive the most engagement and double down on them."
          },
          {
            type: "paragraph",
            value:
              "The more you systemize your process, the more consistent—and stress-free—your content creation becomes."
          }
        ]
      },
      {
        title: "Using Templates in Postmorph",
        blocks: [
          {
            type: "paragraph",
            value:
              "I built Postmorph with templates to save you even more time. Instead of starting from a blank page every time, you can pick a format, drop in your content, and instantly have it styled for the platform."
          },
          {
            type: "paragraph",
            value:
              "Whether it’s a Twitter thread, a LinkedIn post, or a TikTok script, templates give you a head start and make it easier to keep a consistent voice across platforms."
          }
        ]
      },
      {
        title: "Community + Resources",
        blocks: [
          {
            type: "paragraph",
            value:
              "Content creation can feel lonely, but you don’t have to do it alone. I’ll keep sharing resources, guides, and updates on how I’m improving Postmorph so you always have new ideas to work with."
          },
          {
            type: "paragraph",
            value:
              "Stay tuned, keep experimenting, and remember: every piece of content you create can live ten different lives if you repurpose it the right way."
          }
        ]
      }
    ]
  }
];

export default sections;
