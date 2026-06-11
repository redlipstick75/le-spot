"use client"

// =============================================================================
// src/components/ui/dialog.tsx — Composant Dialog / Modale (shadcn/ui)
// =============================================================================
//
// "use client" : les dialogues nécessitent JavaScript pour s'ouvrir/fermer
// et gérer le focus — ils ne peuvent pas être des Server Components.
//
// Ce composant est une fine couche de style sur @base-ui/react/dialog,
// une librairie de primitives accessibles (gestion du focus, aria-modal,
// fermeture avec Échap, piège de focus...).
//
// Utilisation typique dans l'app (voir slot-button.tsx) :
//   <Dialog open={open} onOpenChange={setOpen}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Titre</DialogTitle>
//       </DialogHeader>
//       ... contenu ...
//       <DialogFooter>...</DialogFooter>
//     </DialogContent>
//   </Dialog>
//
// Architecture en "sous-composants" : Dialog, DialogContent, DialogHeader…
// sont des fonctions séparées qu'on assemble. C'est un pattern courant dans
// les librairies UI — chaque partie est indépendante et stylisable.

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
// lucide-react : librairie d'icônes SVG compatibles React. XIcon = croix de fermeture.

// Dialog — le conteneur racine. Il gère l'état ouvert/fermé.
// On passe simplement toutes les props au DialogPrimitive.Root sous-jacent.
function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

// DialogTrigger — l'élément qui déclenche l'ouverture (un bouton en général).
// Dans notre app on n'utilise pas ce composant : on gère l'ouverture avec
// useState + onClick directement dans SlotButton.
function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

// DialogPortal — téléporte le contenu de la modale en dehors du DOM courant
// pour l'afficher par-dessus tout le reste (évite les problèmes de z-index
// et d'overflow:hidden sur les parents).
function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

// DialogClose — bouton de fermeture accessible.
function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

// DialogOverlay — le fond semi-transparent derrière la modale.
// Les classes data-open/data-closed déclenchent des animations CSS
// d'entrée (fade-in) et de sortie (fade-out).
function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

// DialogContent — la fenêtre de la modale elle-même.
// Elle centre le contenu à l'écran (top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2)
// et inclut automatiquement le bouton de fermeture (croix) via showCloseButton.
//
// showCloseButton?: boolean — prop optionnelle avec valeur par défaut (= true).
// Si on veut masquer le bouton croix : <DialogContent showCloseButton={false}>
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {/* Bouton croix en haut à droite — masqué si showCloseButton={false} */}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
            {/* sr-only : texte visible uniquement par les lecteurs d'écran */}
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

// DialogHeader — conteneur pour le titre et la description (en haut de la modale).
// React.ComponentProps<"div"> : ce composant accepte toutes les props d'un <div> HTML.
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

// DialogFooter — conteneur pour les boutons d'action (en bas de la modale).
// showCloseButton optionnel : ajoute un bouton "Close" générique si besoin.
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

// DialogTitle — le titre de la modale (important pour l'accessibilité :
// les lecteurs d'écran annoncent ce titre quand la modale s'ouvre).
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

// DialogDescription — texte secondaire sous le titre.
function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

// On exporte chaque sous-composant séparément pour que l'utilisateur puisse
// les importer sélectivement : import { Dialog, DialogContent } from "..."
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
