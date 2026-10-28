import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from './utils'

const buttonStyles = cva('button', {
  variants: {
    variant: {
      primary: 'button-primary',
      secondary: 'button-secondary',
      quiet: 'button-quiet',
      outline: 'button-outline',
    },
    size: { default: 'button-default', sm: 'button-sm', icon: 'button-icon' },
  },
  defaultVariants: { variant: 'primary', size: 'default' },
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & { asChild?: boolean }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'
  return <Component className={cn(buttonStyles({ variant, size }), className)} {...props} />
}