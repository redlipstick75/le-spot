"use client"

// =============================================================================
// src/components/ui/label.tsx — Composant Label (shadcn/ui)
// =============================================================================
//
// Un <label> HTML stylisé. Le label est essentiel pour l'accessibilité :
// associé à un <input> via htmlFor={id}, il permet aux lecteurs d'écran
// d'annoncer le nom du champ, et rend le clic sur le label actif le champ.
//
// Utilisation :
//   <Label htmlFor="email">Email</Label>
//   <Input id="email" name="email" />

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        // group-data-[disabled=true]: quand un champ parent est désactivé,
        // le label devient aussi visuellement inactif (pointer-events-none + opacité)
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        // peer-disabled: quand l'<input> voisin (peer) est désactivé,
        // le label s'adapte visuellement
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
