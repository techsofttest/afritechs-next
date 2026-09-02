"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { forgotPasswordCustomer, resetPasswordCustomer, verifyOtpCustomer } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    try {
      const res = await forgotPasswordCustomer({ email });
      if (res.status === "error") {
        setErrorMsg(res.message || "Erreur lors de l'envoi du code.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg("Un code de vérification à 6 chiffres a été envoyé à votre adresse e-mail.");
      setStep("verify");
    } catch (err) {
      setErrorMsg("Une erreur réseau s'est produite.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (otp.trim().length !== 6) {
      setErrorMsg("Le code doit contenir 6 chiffres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyOtpCustomer({ email, otp });
      if (res.status === "error") {
        setErrorMsg(res.message || "Code invalide ou expiré.");
        setIsSubmitting(false);
        return;
      }

      setStep("reset");
    } catch (err) {
      setErrorMsg("Une erreur est survenue lors de la vérification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (password.length < 6) {
      setErrorMsg("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await resetPasswordCustomer({ email, otp, password });
      if (res.status === "error") {
        setErrorMsg(res.message || "Échec de la réinitialisation du mot de passe.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg("Votre mot de passe a été réinitialisé avec succès. Redirection vers la page de connexion...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setErrorMsg("Erreur lors de la réinitialisation.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      imageSrc="/auth/login.png"
      imageAlt="Afri Techs — Solutions Informatiques"
      heading="Récupération de votre compte"
      subtext="Suivez les étapes pour réinitialiser le mot de passe de votre espace Afri-Techs."
    >
      <div className="lg:hidden mb-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c2847]/70 hover:text-[#0c2847]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à la connexion
        </Link>
      </div>

      <h2 className="text-[28px] font-bold text-[#0c2847] mb-2">Mot de passe oublié</h2>

      {errorMsg && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-3.5 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
          {successMsg}
        </div>
      )}

      {step === "request" && (
        <>
          <p className="text-gray-500 text-sm mb-6">
            Entrez votre adresse e-mail ci-dessous pour recevoir un code de réinitialisation à 6 chiffres.
          </p>
          <form onSubmit={handleRequestOtp} className="flex flex-col gap-5">
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-semibold text-[#0c2847] mb-1.5">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="forgot-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/30 focus:border-[#0c2847]"
                required
              />
            </div>
            <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full py-3.5 text-base font-bold disabled:opacity-50">
              {isSubmitting ? "Envoi en cours..." : "Envoyer le code"}
            </Button>
          </form>
        </>
      )}

      {step === "verify" && (
        <>
          <p className="text-gray-500 text-sm mb-6">
            Entrez le code de vérification à 6 chiffres envoyé à <strong>{email}</strong>.
          </p>
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#0c2847] mb-1.5">
                Code OTP (6 chiffres)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center text-2xl tracking-[8px] font-mono py-3 border border-gray-400 rounded-lg text-[#0c2847] focus:outline-none focus:border-[#0c2847]"
                required
              />
            </div>
            <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full py-3.5 text-base font-bold disabled:opacity-50">
              {isSubmitting ? "Vérification..." : "Continuer"}
            </Button>
          </form>
        </>
      )}

      {step === "reset" && (
        <>
          <p className="text-gray-500 text-sm mb-6">
            Saisissez votre nouveau mot de passe (6 caractères minimum).
          </p>
          <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-[#0c2847] mb-1.5">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:border-[#0c2847]"
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0c2847]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0c2847] mb-1.5">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:border-[#0c2847]"
                minLength={6}
                required
              />
            </div>

            <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full py-3.5 text-base font-bold disabled:opacity-50">
              {isSubmitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            </Button>
          </form>
        </>
      )}

      <div className="text-center mt-8 text-sm text-gray-500">
        Vous vous souvenez de votre mot de passe ?{" "}
        <Link href="/login" className="text-[#0c2847] font-bold hover:underline">
          Se connecter
        </Link>
      </div>
    </AuthLayout>
  );
}
