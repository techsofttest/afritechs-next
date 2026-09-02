import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      imageSrc="/auth/login.png"
      imageAlt="Afri Techs — Solutions Informatiques"
      heading="Solutions technologiques pour l'Afrique"
      subtext="Connectez-vous pour accéder à votre espace client et suivre vos commandes."
    >
      <LoginForm />
    </AuthLayout>
  );
}
