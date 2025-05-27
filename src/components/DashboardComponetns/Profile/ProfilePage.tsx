/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"
import { updateUser } from "@/service/Auth"
import { toast } from "sonner"

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
                                    <Button
                                        variant="outline"
                                        className="justify-start border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        Change Password
                                    </Button>
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

