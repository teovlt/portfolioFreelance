import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { contactSchema } from "@/lib/zod";

export const Contact = () => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    try {
      const response = await fetch("https://formspree.io/f/mdkgvoeq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      if (response.ok) {
        toast.success("Merci ! Je reviendrai vers vous rapidement.");
        form.reset();
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error("Échec de l'envoi du message.");
      console.error(error);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center" id="contact-section">
      <div className="container p-4 sm:p-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out. I'm always open to new ideas and
            collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject of your message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write your message here..." className="min-h-32 resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center"
          >
            <div className="space-y-8 flex-col justify-center items-center">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <a
                      className="text-muted-foreground hover:underline"
                      href="https://www.google.fr/search?q=grenoble&sca_esv=c040be438cc12ffb&source=hp&ei=Gw0uaIeQG8rhkdUPq_WB-AE&iflsig=ACkRmUkAAAAAaC4bK73XIqGGSGT5iGNchimet6mir0NG&gs_ssp=eJzj4tDP1TdISYtPNmD04kgvSs3LT8pJBQA-vgZr&oq=grenoble&gs_lp=Egdnd3Mtd2l6IghncmVub2JsZSoCCAAyCBAuGIAEGLEDMggQABiABBixAzIOEC4YgAQYsQMYxwEYrwEyBRAAGIAEMggQLhiABBixAzIFEAAYgAQyCBAAGIAEGLEDMggQLhiABBixAzIUEC4YgAQYsQMYgwEYxwEYigUYrwEyBRAAGIAESL8WUPgBWIkRcAJ4AJABAJgBW6ABpQSqAQE5uAEByAEA-AEBmAILoALUBKgCCsICChAuGAMY6gIYjwHCAgoQABgDGOoCGI8BwgIMEC4YAxjqAhgKGI8BwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICERAuGIAEGLEDGIMBGNQCGIoFwgILEC4YgAQYsQMYgwHCAhEQLhiABBixAxjRAxiDARjHAcICBRAuGIAEwgIOEC4YgAQYsQMYgwEYigXCAgQQABgDwgILEC4YgAQYxwEYrwGYAwfxBdv02H_0fFKvkgcCMTGgB9aBAbIHATm4B8kE&sclient=gws-wiz&sei=IA0uaL72H_eekdUPn62SsQE"
                      target="_blank"
                    >
                      Grenoble, FR
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:contact@example.com" className="hover:underline">
                        teo.villet2@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:+12345678901" className="hover:underline">
                        +33 618215637
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
