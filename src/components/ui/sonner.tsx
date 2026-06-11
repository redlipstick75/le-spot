"use client"

// =============================================================================
// src/components/ui/sonner.tsx — Composant Toaster / notifications (shadcn/ui)
// =============================================================================
//
// Ce composant configure la librairie "sonner" pour afficher des notifications
// "toast" (petits messages temporaires qui apparaissent en haut de l'écran).
//
// Il est placé une seule fois dans layout.tsx : <Toaster richColors position="top-center" />
// Ensuite, depuis n'importe quel Client Component, on peut afficher un toast avec :
//   import { toast } from "sonner"
//   toast.success("Réservation confirmée !")
//   toast.error("Une erreur s'est produite.")
//
// "use client" : sonner lit le thème (clair/sombre) depuis le navigateur.

import { useTheme } from "next-themes"
// next-themes : librairie qui gère le thème clair/sombre et le persiste
// dans localStorage. useTheme() renvoie le thème actif ("light", "dark", "system").
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} // on passe le thème pour que les toasts s'adaptent
      className="toaster group"
      // icons : on remplace les icônes par défaut de sonner par nos icônes lucide-react
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      // style : on branche les couleurs sur les variables CSS du thème Tailwind
      // (--popover, --border, --radius) pour que les toasts suivent le design system.
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
