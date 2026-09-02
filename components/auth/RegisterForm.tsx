"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import { registerCustomer, resendRegistrationCode, verifyRegistrationCode } from "@/lib/api";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Email verification step
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifySuccessMsg, setVerifySuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

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
      const res = await registerCustomer({
        name,
        email,
        phone,
        password,
      });

      if (res.status === "error") {
        setErrorMsg(res.message || "Échec de l'inscription.");
        setIsSubmitting(false);
        return;
      }

      if (res.status === "success" && res.requires_verification) {
        setIsVerificationStep(true);
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg("Une erreur réseau s'est produite. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setVerifySuccessMsg(null);

    if (verifyCode.trim().length !== 6) {
      setErrorMsg("Le code doit contenir exactement 6 chiffres.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await verifyRegistrationCode({
        email,
        code: verifyCode,
      });

      if (res.status === "error") {
        setErrorMsg(res.message || "Code invalide.");
        setIsSubmitting(false);
        return;
      }

      if (res.status === "success" && res.customer) {
        localStorage.setItem(
          "afri_techs_user",
          JSON.stringify({
            id: res.customer.id,
            firstName: res.customer.name.split(" ")[0] || res.customer.name,
            fullName: res.customer.name,
            email: res.customer.email,
            phone: res.customer.phone,
          })
        );
        if (res.token) {
          localStorage.setItem("afri_techs_token", res.token);
        }
        window.location.href = "/";
      }
    } catch (err) {
      setErrorMsg("Une erreur est survenue lors de la vérification.");
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setErrorMsg(null);
    setVerifySuccessMsg(null);

    try {
      const res = await resendRegistrationCode({ email });
      if (res.status === "success") {
        setVerifySuccessMsg("Un nouveau code a été envoyé à votre adresse e-mail.");
      } else {
        setErrorMsg(res.message || "Erreur lors de l'envoi du code.");
      }
    } catch (err) {
      setErrorMsg("Erreur réseau.");
    }
  };

  if (isVerificationStep) {
    return (
      <>
        <h2 className="text-[28px] font-bold text-[#0c2847] mb-2">Vérifiez votre e-mail</h2>
        <p className="text-gray-500 text-sm mb-6">
          Un code de vérification à 6 chiffres a été envoyé à <strong>{email}</strong>. Saisissez-le ci-dessous pour valider votre compte.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        {verifySuccessMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
            {verifySuccessMsg}
          </div>
        )}

        <form onSubmit={handleVerifyCode} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-[#0c2847] mb-1.5">
              Code de vérification (6 chiffres)
            </label>
            <input
              type="text"
              maxLength={6}
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="w-full text-center text-2xl tracking-[8px] font-mono py-3 border border-gray-400 rounded-lg text-[#0c2847] focus:outline-none focus:border-[#0c2847]"
              required
            />
          </div>

          <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full py-3.5 text-base font-bold">
            {isSubmitting ? "Vérification..." : "Activer mon compte"}
          </Button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500 flex flex-col gap-2">
          <button type="button" onClick={handleResendCode} className="text-[#0c2847] font-bold hover:underline">
            Renvoyer le code de vérification
          </button>
          <button type="button" onClick={() => setIsVerificationStep(false)} className="text-gray-500 text-xs hover:underline mt-1">
            Modifier les informations
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="lg:hidden mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c2847]/70 hover:text-[#0c2847]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </Link>
      </div>
      <h2 className="text-[28px] font-bold text-[#0c2847] mb-2">Créer un compte</h2>
      <p className="text-gray-500 text-sm mb-8">
        Remplissez le formulaire pour commencer.
      </p>

      {errorMsg && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="reg-fullname" className="block text-sm font-semibold text-[#0c2847] mb-1.5">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="reg-fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/30 focus:border-[#0c2847] transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-sm font-semibold text-[#0c2847] mb-1.5">
            Adresse e-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/30 focus:border-[#0c2847] transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="reg-phone" className="block text-sm font-semibold text-[#0c2847] mb-1.5">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            id="reg-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/30 focus:border-[#0c2847] transition-all"
            placeholder="+224 ..."
          />
        </div>

        <div>
          <label htmlFor="reg-password" className="block text-sm font-semibold text-[#0c2847] mb-1.5">
            Mot de passe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/30 focus:border-[#0c2847] transition-all"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0c2847] transition-colors focus:outline-none"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="reg-confirm-password" className="block text-sm font-semibold text-[#0c2847] mb-1.5">
            Confirmer le mot de passe <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="reg-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-400 rounded-lg text-[14px] text-[#0c2847] focus:outline-none focus:ring-2 focus:ring-[#0c2847]/30 focus:border-[#0c2847] transition-all"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#0c2847] transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full py-3.5 text-base font-bold mt-2 disabled:opacity-50"
        >
          {isSubmitting ? "Inscription..." : "S'inscrire"}
        </Button>
      </form>

      <div className="text-center mt-8 text-sm text-gray-500">
        Vous avez déjà un compte ?{" "}
        <Link href="/login" className="text-[#0c2847] font-bold hover:underline">
          Se connecter
        </Link>
      </div>
    </>
  );
}
