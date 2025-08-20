import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Clock,
  TrendingUp,
  Bot,
  Shield,
  BookOpen,
  Droplets,
  Activity,
  Calendar,
} from "lucide-react";
import { getCurrentUser } from "../utils/storage";
import { Link } from "react-router-dom";

const stats = [
  {
    name: "Active Users",
    value: "12,345",
    icon: Users,
    color: "bg-blue-500",
    change: "+12%",
  },
  {
    name: "Interactions Checked",
    value: "8,902",
    icon: Shield,
    color: "bg-green-500",
    change: "+8%",
  },
  {
    name: "AI Consultations",
    value: "5,678",
    icon: Bot,
    color: "bg-purple-500",
    change: "+15%",
  },
  {
    name: "Blood Requests",
    value: "234",
    icon: Droplets,
    color: "bg-red-500",
    change: "+5%",
  },
];

const quickActions = [
  {
    name: "Ask AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
    color: "bg-purple-100 text-purple-600",
    desc: "Get instant health advice",
  },
  {
    name: "Check Drug Interactions",
    href: "/drug-checker",
    icon: Shield,
    color: "bg-green-100 text-green-600",
    desc: "Verify medication safety",
  },
  {
    name: "Browse Medicine Library",
    href: "/library",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    desc: "Find drug information",
  },
  {
    name: "Set Reminder",
    href: "/reminders",
    icon: Clock,
    color: "bg-orange-100 text-orange-600",
    desc: "Never miss a dose",
  },
];

const recentActivities = [
  {
    action: "AI consultation completed",
    time: "2 minutes ago",
    type: "success",
    icon: Bot,
  },
  {
    action: "Medicine reminder set for Aspirin",
    time: "1 hour ago",
    type: "info",
    icon: Clock,
  },
  {
    action: "Blood donation request sent",
    time: "3 hours ago",
    type: "warning",
    icon: Droplets,
  },
  {
    action: "Drug interaction check performed",
    time: "5 hours ago",
    type: "success",
    icon: Shield,
  },
];

const Dashboard: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {currentUser?.name || "Guest"}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Here's your healthcare dashboard overview for today
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4" />
                  <span className="text-sm">
                    Blood Group: {currentUser?.bloodGroup || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Age: {currentUser?.age || "N/A"} years
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300/20 rounded-full translate-y-24 -translate-x-24"></div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{stat.change} from last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={action.href}
                  className="block p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl ${action.color} mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{action.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Health Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Health Score</h3>
            <div className="p-2 bg-green-500 rounded-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
            <p className="text-sm text-gray-600">Excellent health management</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Medication Adherence</span>
              <span className="font-semibold text-green-600">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Health Checkups</span>
              <span className="font-semibold text-blue-600">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> Set more reminders to improve your
              medication adherence score!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-orange-500" />
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${
                  activity.type === "success"
                    ? "bg-green-100"
                    : activity.type === "warning"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >
                <activity.icon
                  className={`h-4 w-4 ${
                    activity.type === "success"
                      ? "text-green-600"
                      : activity.type === "warning"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === "success"
                    ? "bg-green-500"
                    : activity.type === "warning"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              ></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
