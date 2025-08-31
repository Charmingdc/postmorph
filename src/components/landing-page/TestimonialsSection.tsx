import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Repurpose.ai has transformed my content strategy. I used to spend hours creating content for different platforms, but now I can do it in minutes.",
    author: "Sarah Johnson",
    role: "Content Creator",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote:
      "As a podcast host, this tool is a game changer. I can now easily convert my episodes into blog posts, social media snippets, and more without any extra work.",
    author: "Mark Thompson",
    role: "Podcast Host",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    quote:
      "Our marketing team's productivity has increased by 300% since we started using this platform. The AI quality is exceptional.",
    author: "Emily Rodriguez",
    role: "Marketing Director",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-10 -mt-8">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">
            Loved by <span className="heading-gradient">content creators </span>
            worldwide
          </h2>
          <p className="text-muted-foreground text-md">
            See what our users have to say about their experience with our
            platform
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="animate-fade-in bg-card border rounded-2xl p-6 shadow-sm"
            >
              <Quote className="h-10 w-10 text-accent mb-4" />
              <p className="text-md mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
