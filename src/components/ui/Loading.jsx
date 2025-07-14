import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        {/* Loading animation */}
        <motion.div
          className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Loading your tasks...
        </h3>
        <p className="text-gray-500">
          Please wait while we fetch your data
        </p>
      </motion.div>

      {/* Skeleton cards */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
                <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-1/2" />
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;