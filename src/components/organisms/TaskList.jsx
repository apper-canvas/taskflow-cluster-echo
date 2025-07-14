import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/molecules/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const TaskList = ({ 
  tasks, 
  categories, 
  loading, 
  error, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask, 
  onRetry,
  className 
}) => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

const getCategoryById = (categoryId) => {
    return categories.find(c => c.Id === parseInt(categoryId));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!filteredTasks || filteredTasks.length === 0) {
    return <Empty />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("space-y-4", className)}
    >
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.Id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              category={getCategoryById(task.categoryId)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;