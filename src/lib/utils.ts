import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Утилиты для анимаций
export const fadeInUp = "animate-fade-in-up"
export const fadeInDown = "animate-fade-in-down"
export const slideInLeft = "animate-slide-in-left"
export const slideInRight = "animate-slide-in-right"

// Утилиты для задержек анимаций
export const getAnimationDelay = (index: number, baseDelay = 100) => 
  `animation-delay-${index * baseDelay}ms`

// Утилиты для responsive классов
export const responsiveClasses = {
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-12 sm:py-16 lg:py-20",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
  text: {
    heading: "text-2xl sm:text-3xl lg:text-4xl font-bold",
    subheading: "text-xl sm:text-2xl lg:text-3xl font-semibold",
    body: "text-base sm:text-lg",
    small: "text-sm sm:text-base"
  }
}

// Утилиты для темной темы
export const darkModeClasses = {
  bg: "bg-white dark:bg-gray-900",
  text: "text-gray-900 dark:text-gray-100",
  textSecondary: "text-gray-600 dark:text-gray-400",
  border: "border-gray-200 dark:border-gray-700",
  card: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
}

// Утилиты для состояний загрузки
export const loadingStates = {
  disabled: "opacity-50 cursor-not-allowed",
  loading: "animate-pulse",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500"
}
