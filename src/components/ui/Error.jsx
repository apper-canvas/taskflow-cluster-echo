import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message || "We encountered an error while loading your tasks. Please try again."}
      </p>
      
      <div className="flex space-x-3">
        <Button
          variant="primary"
          onClick={onRetry}
          className="flex items-center"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => window.location.reload()}
          className="flex items-center"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Reload Page
        </Button>
      </div>
    </motion.div>
  );
};

export default Error;