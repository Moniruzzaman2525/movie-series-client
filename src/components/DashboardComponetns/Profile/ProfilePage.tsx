/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Edit, Save, X } from "lucide-react"
import { updatePassword, updateUser } from "@/service/Auth"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, EyeOff } from "lucide-react"

interface IUser {
    _id: string
    name: string
    email: string
    role: string
}

export default function ProfilePage({ user }: { user: IUser }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
    })

    const [showChangePassword, setShowChangePassword] = useState(false)
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })
    const [passwordLoading, setPasswordLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSave = async () => {
        const data = {
            name: formData.name,
        }

        const res = await updateUser(data)
        if (res.success) {
            setIsEditing(false)
            toast.success("Profile updated successfully")
        }

        try {
        } catch (error) {
            alert("Failed to update profile")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
        })
        setIsEditing(false)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlePasswordSubmit = async () => {
        // Validation
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            toast.error("Please fill in all password fields")
            return
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match")
            return
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long")
            return
        }

        if (passwordData.currentPassword === passwordData.newPassword) {
            toast.error("New password must be different from current password")
            return
        }

        setPasswordLoading(true)
        try {
            const res = await updatePassword({
                oldPassword: passwordData.currentPassword,
                password: passwordData.newPassword
            })
            if (res.success) {
                toast.success("Password changed successfully")
                setShowChangePassword(false)
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                })
            } else {
                toast.error(res.message)
            }


        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setPasswordLoading(false)
        }
    }

    const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    return (
        <div className="min-h-screen bg-[#020508] py-8 px-4">
            <div className="max-w-4xl mx-auto mt-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">My Profile</h1>
                    <p className="text-gray-400 mt-2">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="bg-gray-900/50 border-gray-800">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="h-24 w-24 mb-4 ring-2 ring-red-600/20">
                                        <AvatarFallback className="bg-red-600 text-white text-xl">
                                            {user.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <h3 className="text-xl font-semibold text-white mb-1">{formData.name}</h3>
                                    <p className="text-gray-400 mb-3">{formData.email}</p>
                                    <Badge variant="secondary" className="bg-red-600/20 text-red-400 border-red-600/30">
                                        {user.role}
                                    </Badge>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-300">{formData.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-2">
                        <Card className="bg-gray-900/50 border-gray-800">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-white">Profile Information</CardTitle>
                                    <CardDescription className="text-gray-400">Update your personal details</CardDescription>
                                </div>

                                {!isEditing ? (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        variant="outline"
                                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleCancel}
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleSave}
                                            size="sm"
                                            disabled={isLoading}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            {isLoading ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>

                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-300">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your full name"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-300">
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            disabled
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mt-6 bg-gray-900/50 border-gray-800">
                            <CardHeader>
                                <CardTitle className="text-white">Account Actions</CardTitle>
                                <CardDescription className="text-gray-400">Quick access to account settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                            >
                                                Change Password
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-gray-900 border-gray-800 text-white">
                                            <DialogHeader>
                                                <DialogTitle>Change Password</DialogTitle>
                                                <DialogDescription className="text-gray-400">
                                                    Enter your current password and choose a new one.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 mt-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="currentPassword" className="text-gray-300">
                                                        Current Password
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="currentPassword"
                                                            name="currentPassword"
                                                            type={showPasswords.current ? "text" : "password"}
                                                            value={passwordData.currentPassword}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Enter current password"
                                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 pr-10"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() => togglePasswordVisibility("current")}
                                                        >
                                                            {showPasswords.current ? (
                                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-gray-400" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="newPassword" className="text-gray-300">
                                                        New Password
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="newPassword"
                                                            name="newPassword"
                                                            type={showPasswords.new ? "text" : "password"}
                                                            value={passwordData.newPassword}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Enter new password"
                                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 pr-10"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() => togglePasswordVisibility("new")}
                                                        >
                                                            {showPasswords.new ? (
                                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-gray-400" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="confirmPassword" className="text-gray-300">
                                                        Confirm New Password
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="confirmPassword"
                                                            name="confirmPassword"
                                                            type={showPasswords.confirm ? "text" : "password"}
                                                            value={passwordData.confirmPassword}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Confirm new password"
                                                            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-600 pr-10"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                            onClick={() => togglePasswordVisibility("confirm")}
                                                        >
                                                            {showPasswords.confirm ? (
                                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-gray-400" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-2 pt-4">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setShowChangePassword(false)
                                                            setPasswordData({
                                                                currentPassword: "",
                                                                newPassword: "",
                                                                confirmPassword: "",
                                                            })
                                                        }}
                                                        className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={handlePasswordSubmit}
                                                        disabled={passwordLoading}
                                                        className="bg-red-600 hover:bg-red-700 text-white"
                                                    >
                                                        {passwordLoading ? "Changing..." : "Change Password"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button
                                        disabled
                                        variant="outline"
                                        className="justify-start text-red-400 border-red-800 hover:bg-red-900/20 hover:text-red-300"
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
