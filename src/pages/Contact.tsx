import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { contactSchema } from "@/lib/zod";

export const Contact = () => {
  const { t } = useTranslation();
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
        toast.success(t("contact.success"));
        form.reset();
      } else {
        toast.error(t("contact.error"));
      }
    } catch (error) {
      toast.error(t("contact.failure"));
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
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold "
          >
            {t("contact.title")} <span className="text-primary">{t("contact.highlight")}</span>
          </motion.h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">{t("contact.description")}</p>
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
                        <FormLabel>{t("contact.form.name.label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.form.name.placeholder")} {...field} />
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
                        <FormLabel>{t("contact.form.email.label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.form.email.placeholder")} {...field} />
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
                      <FormLabel>{t("contact.form.subject.label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.form.subject.placeholder")} {...field} />
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
                      <FormLabel>{t("contact.form.message.label")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t("contact.form.message.placeholder")} className="min-h-32 resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  {t("contact.form.submit")}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center items-center"
          >
            <div className="space-y-8 flex-col justify-center items-center">
              <h3 className="text-xl font-semibold mb-4">{t("contact.info.title")}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t("contact.info.location.label")}</h4>
                    <a className="text-muted-foreground hover:underline" href="https://www.google.fr/search?q=grenoble" target="_blank">
                      {t("contact.info.location.value")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{t("contact.info.email.label")}</h4>
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
                    <h4 className="font-medium">{t("contact.info.phone.label")}</h4>
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
