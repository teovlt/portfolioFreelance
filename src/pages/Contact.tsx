import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCalendar } from "@/components/customs/booking-calendar";
import { Accent } from "@/components/customs/accent-text";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { toast } from "sonner";
import { contactSchema } from "@/lib/zod";
import { usePackage } from "@/providers/package-provider";

export const Contact = () => {
  const { t } = useTranslation();
  const { selectedPackage, setSelectedPackage } = usePackage();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!selectedPackage) return;
    form.setValue("subject", t("contact.packageSubject", { package: selectedPackage }));
    form.setValue("message", t("contact.packageMessage", { package: selectedPackage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPackage]);

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
        setSelectedPackage(null);
      } else {
        toast.error(t("contact.error"));
      }
    } catch (error) {
      toast.error(t("contact.failure"));
      console.error(error);
    }
  }

  return (
    <section className="py-24 sm:py-32" id="contact-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="eyebrow justify-center mb-4">{t("contact.eyebrow")}</p>
          <h2 className="text-4xl md:text-5xl">
            {t("contact.title")} <Accent className="font-serif italic font-medium">{t("contact.highlight")}</Accent>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">{t("contact.description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 mb-6 rounded-full border border-accent/40 bg-accent/10 pl-4 pr-2 py-1.5 text-sm"
              >
                <span className="text-muted-foreground">{t("contact.packageChipLabel")}</span>
                <span className="font-semibold">{selectedPackage}</span>
                <button
                  onClick={() => setSelectedPackage(null)}
                  aria-label={t("contact.packageClear")}
                  className="ml-1 rounded-full p-1 hover:bg-accent/20 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            )}

            <Tabs defaultValue="booking">
              <TabsList className="mb-8">
                <TabsTrigger value="booking">{t("contact.tabs.booking")}</TabsTrigger>
                <TabsTrigger value="message">{t("contact.tabs.message")}</TabsTrigger>
              </TabsList>

              <TabsContent value="booking" className="mt-0">
                <BookingCalendar packageName={selectedPackage} />
              </TabsContent>

              <TabsContent value="message" className="mt-0">
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
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center items-center"
          >
            <div className="space-y-8 flex-col justify-center items-center">
              <h3 className="eyebrow mb-4">{t("contact.info.title")}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-foreground">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-medium">{t("contact.info.location.label")}</h4>
                    <a
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      href="https://www.google.fr/search?q=lille+grenoble"
                      target="_blank"
                    >
                      {t("contact.info.location.value")}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-medium">{t("contact.info.email.label")}</h4>
                    <p className="text-muted-foreground">
                      <a href="mailto:teo.villet2@gmail.com" className="hover:text-foreground transition-colors">
                        teo.villet2@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-foreground">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-medium">{t("contact.info.phone.label")}</h4>
                    <p className="text-muted-foreground">
                      <a href="tel:+33618215637" className="hover:text-foreground transition-colors">
                        +33 6 18 21 56 37
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
