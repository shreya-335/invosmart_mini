"use client"

import { useAuth } from "../context/AuthContext"

const RoleGuard = ({ children, allowedRoles, fallback = null }) => {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback
  }

  return children
}

export default RoleGuard
