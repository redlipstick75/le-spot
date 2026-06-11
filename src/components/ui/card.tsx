// =============================================================================
// src/components/ui/card.tsx — Composant Card (shadcn/ui)
// =============================================================================
//
// Une Card est un conteneur visuel avec fond, bordure et ombre légère.
// Elle est utilisée partout dans l'app : créneaux du planning, réservations,
// formulaires admin.
//
// Pattern shadcn : des sous-composants séparés (CardHeader, CardContent…)
// qu'on assemble librement. Pas de props "title" ou "description" imposées :
// on place ce qu'on veut où on veut.

import * as React from "react"
// React.ComponentProps<"div"> : type TypeScript qui récupère toutes les props
// natives d'un <div> HTML (className, onClick, id, style...). On n'a pas à
// les lister une par une — elles sont toutes acceptées et transmises via {...props}.

import { cn } from "@/lib/utils"

// Card — le conteneur principal.
// size="sm" réduit les espacements internes (utilisé dans les tableaux compacts).
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size} // attribut HTML personnalisé ciblé par les classes Tailwind data-[size=sm]:...
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

// CardHeader — zone du haut, contient généralement CardTitle et CardDescription.
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

// CardTitle — le titre de la Card (un <div> stylisé, pas un <h2>).
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

// CardDescription — texte secondaire sous le titre.
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

// CardAction — zone d'action alignée à droite du header (ex. un bouton "Voir tout").
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

// CardContent — le corps de la Card. C'est ici qu'on met le contenu principal.
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

// CardFooter — le pied de la Card, avec fond légèrement différent et bordure haute.
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
