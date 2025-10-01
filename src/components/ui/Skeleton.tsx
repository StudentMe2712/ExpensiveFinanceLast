import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'default' | 'card' | 'text' | 'circle' | 'button'
  animate?: boolean
}

const Skeleton = ({ 
  className, 
  variant = 'default', 
  animate = true 
}: SkeletonProps) => {
  const baseClasses = "bg-gray-200 dark:bg-gray-700"
  const animateClasses = animate ? "animate-pulse" : ""
  
  const variants = {
    default: "rounded-md",
    card: "rounded-lg",
    text: "rounded",
    circle: "rounded-full",
    button: "rounded-lg"
  }

  return (
    <div 
      className={cn(
        baseClasses,
        animateClasses,
        variants[variant],
        className
      )}
    />
  )
}

// Предустановленные skeleton компоненты
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("space-y-3", className)}>
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-20 w-full" />
  </div>
)

export const SkeletonText = ({ lines = 3, className }: { lines?: number; className?: string }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        className={cn(
          "h-4",
          i === lines - 1 ? "w-3/4" : "w-full"
        )} 
      />
    ))}
  </div>
)

export const SkeletonButton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("h-10 w-32", className)} />
)

export const SkeletonAvatar = ({ size = 40, className }: { size?: number; className?: string }) => (
  <Skeleton 
    variant="circle" 
    className={cn(`w-${size} h-${size}`, className)} 
  />
)

export const SkeletonStats = ({ className }: { className?: string }) => (
  <div className={cn("grid grid-cols-3 gap-6", className)}>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="text-center space-y-2">
        <Skeleton variant="circle" className="h-12 w-12 mx-auto" />
        <Skeleton className="h-6 w-16 mx-auto" />
        <Skeleton className="h-4 w-20 mx-auto" />
      </div>
    ))}
  </div>
)

export default Skeleton