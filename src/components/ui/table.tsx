"use client"

// =============================================================================
// src/components/ui/table.tsx — Composant Table (shadcn/ui)
// =============================================================================
//
// Un tableau HTML (<table>) stylisé. Inclus par shadcn mais non utilisé dans
// l'app actuellement (le planning utilise des div flexbox plutôt qu'un tableau).
//
// Architecture en sous-composants : chaque balise HTML du tableau a son
// propre composant React avec les classes Tailwind appropriées.
// Table → TableHeader → TableRow → TableHead  (en-têtes)
// Table → TableBody  → TableRow → TableCell   (données)

import * as React from "react"

import { cn } from "@/lib/utils"

// Table — le conteneur. Le div extérieur permet le scroll horizontal sur mobile
// (overflow-x-auto) sans casser la mise en page.
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

// TableHeader — le <thead> : contient les lignes d'en-tête.
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)} // bordure sous la ligne d'en-tête
      {...props}
    />
  )
}

// TableBody — le <tbody> : contient les lignes de données.
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)} // pas de bordure sur la dernière ligne
      {...props}
    />
  )
}

// TableFooter — le <tfoot> : ligne de pied de tableau (totaux, résumés).
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

// TableRow — une ligne <tr>. Passe en fond grisé au survol (hover:bg-muted/50).
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

// TableHead — une cellule d'en-tête <th>. Texte en gras et aligné à gauche.
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

// TableCell — une cellule de données <td>.
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

// TableCaption — le <caption> HTML : légende affichée sous le tableau.
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
