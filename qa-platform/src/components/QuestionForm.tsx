import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

interface QuestionFormProps {
  onSubmit: (question: string) => void;
}

export default function QuestionForm({ onSubmit }: QuestionFormProps) {
  const { user } = useUser();
  const [quiz, setQuiz] = useState("");
  const [showSubmitText, setShowSubmitText] = useState(false);

  useEffect(() => {
    if (showSubmitText) {
      setTimeout(() => {
        setShowSubmitText(false);
      }, 7000);
    }
  }, [showSubmitText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast("You need to sign up to post questions.");
      return;
    }

    if (quiz.trim()) {
      onSubmit(quiz);
      setQuiz("");
      setShowSubmitText(true);
      toast("question submitted for review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <div className="flex-grow">
          <Input
            type="text"
            name="quiz"
            id="quiz"
            value={quiz}
            onChange={(e) => setQuiz(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow"
          />
          <div className="text-green-500 text-sm transition-all h-4">
            {showSubmitText ? "Your question has been submitted for review." : ""}
          </div>
        </div>
        <Button type="submit">Ask</Button>
      </div>
    </form>
  );
}
