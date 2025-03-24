"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: string
  message: string
  timestamp: number
}

export interface NotificationCenterRef {
  addNotification: (message: string) => void
}

export const NotificationCenter = forwardRef<NotificationCenterRef, {}>((props, ref) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
  }, [])

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: Date.now(),
    }
    const updatedNotifications = [...notifications, newNotification]
    setNotifications(updatedNotifications)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
  }

  useImperativeHandle(ref, () => ({
    addNotification,
  }))

  const clearNotifications = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden"
          >
            <div className="py-2 px-4 bg-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <button onClick={clearNotifications} className="text-sm text-gray-600 hover:text-gray-800">
                Clear all
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-4 px-4 text-gray-600 text-center">No notifications</p>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className="py-2 px-4 border-b last:border-b-0">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

NotificationCenter.displayName = "NotificationCenter"

