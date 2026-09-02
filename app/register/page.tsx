import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      imageSrc="/auth/reg.png"
      imageAlt="Afri Techs — Rejoignez-nous"
      heading="Rejoignez l'écosystème technologique africain"
      subtext="Créez votre compte pour commander des équipements et accéder à nos services exclusifs."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
