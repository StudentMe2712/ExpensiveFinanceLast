'use client'

import { useEffect } from 'react'

const VisualEnhancements = () => {
  useEffect(() => {
    // Добавляем плавные переходы для всех элементов
    const style = document.createElement('style')
    style.textContent = `
      * {
        scroll-behavior: smooth;
      }
      
      /* Улучшенные анимации для кнопок */
      .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .btn-primary::before, .btn-secondary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      
      .btn-primary:hover::before, .btn-secondary:hover::before {
        left: 100%;
      }
      
      /* Улучшенные карточки */
      .card, .card-medium, .card-dramatic {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
      }
      
      .card:hover, .card-medium:hover, .card-dramatic:hover {
        transform: translateY(-2px);
      }
      
      /* Параллакс эффект для фона */
      .parallax-bg {
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      
      /* Улучшенные градиенты */
      .luxury-gradient {
        background: linear-gradient(135deg, 
          rgba(59, 130, 246, 0.1) 0%, 
          rgba(6, 182, 212, 0.1) 25%, 
          rgba(139, 92, 246, 0.1) 50%, 
          rgba(236, 72, 153, 0.1) 75%, 
          rgba(59, 130, 246, 0.1) 100%);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
      }
      
      /* Улучшенные тени */
      .shadow-luxury {
        box-shadow: 
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      
      .shadow-luxury:hover {
        box-shadow: 
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      
      /* Улучшенные иконки */
      .icon-glow {
        filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
        transition: filter 0.3s ease;
      }
      
      .icon-glow:hover {
        filter: drop-shadow(0 0 16px rgba(59, 130, 246, 0.6));
      }
      
      /* Улучшенные формы */
      .input-field, .textarea-field {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
      }
      
      .input-field:focus, .textarea-field:focus {
        background: rgba(255, 255, 255, 1);
        box-shadow: 
          0 0 0 3px rgba(59, 130, 246, 0.1),
          0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
      }
      
      /* Улучшенные модальные окна */
      .modal-backdrop {
        backdrop-filter: blur(8px);
        background: rgba(0, 0, 0, 0.5);
      }
      
      .modal-content {
        backdrop-filter: blur(20px);
        background: rgba(255, 255, 255, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      /* Улучшенные слайдеры */
      .slider-primary {
        background: linear-gradient(to right, #3b82f6 0%, #06b6d4 100%);
        height: 8px;
        border-radius: 4px;
        outline: none;
        -webkit-appearance: none;
        transition: all 0.3s ease;
      }
      
      .slider-primary:hover {
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
      }
      
      /* Улучшенные анимации появления */
      .fade-in-up {
        animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      
      .fade-in-left {
        animation: fadeInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      
      .fade-in-right {
        animation: fadeInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      
      .scale-in {
        animation: scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      
      /* Улучшенные декоративные элементы */
      .decorative-dots {
        background-image: radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
      }
      
      .decorative-grid {
        background-image: 
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
        background-size: 20px 20px;
      }
      
      .decorative-waves {
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      
      /* Улучшенные hover эффекты */
      .hover-lift {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-lift:hover {
        transform: translateY(-4px);
      }
      
      .hover-glow {
        transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .hover-glow:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
      
      /* Улучшенные границы */
      .border-gradient {
        border: 2px solid transparent;
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(135deg, #3b82f6, #06b6d4) border-box;
      }
      
      /* Улучшенные текстовые эффекты */
      .text-gradient {
        background: linear-gradient(135deg, #3b82f6, #06b6d4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .text-shadow {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      /* Улучшенные анимации загрузки */
      .loading-spinner {
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      /* Улучшенные медиа-запросы */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `
    
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}

export default VisualEnhancements
