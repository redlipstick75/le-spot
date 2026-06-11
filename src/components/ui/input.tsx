// =============================================================================
// src/components/ui/input.tsx — Composant Input (shadcn/ui)
// =============================================================================
//
// Un champ de saisie stylisé. C'est une fine couche de style sur
// @base-ui/react/input (qui gère l'accessibilité et les états aria).
//
// Utilisation : <Input name="email" type="email" required />
// Les props standard HTML (name, type, placeholder, required, disabled…)
// sont toutes acceptées et transmises via ...props.

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

// React.ComponentProps<"input"> : toutes les props natives d'un <input> HTML.
// On en extrait className et type pour les utiliser directement ;
// le reste (...props) est transmis tel quel au InputPrimitive.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Styles de base : hauteur fixe, pleine largeur, bordure, fond transparent
        // focus-visible:ring : anneau de focus visible pour l'accessibilité clavier
        // disabled: styles visuels quand le champ est désactivé
        // aria-invalid: styles rouges quand le champ est en erreur
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
