'use client'

import { useState, useEffect } from 'react'
import { useUser, useClerk } from '@clerk/nextjs'
import QuestionForm from '../../components/QuestionForm'
import Header from '../../components/Header'
import QuestionItem from '@/components/QuestionItem'
import * as actions from '../../app/qa/actions'


export default function QAPage() {
  const { user } = useUser() // Get the currently signed-in user
  const { user: clerkUser } = useClerk() // Get Clerk instance for user updates
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    const assignUserRole = async () => {
      if (!user) return // Do nothing if there's no signed-in user

      const userId = user.id
      const role = user.publicMetadata?.role // Check if role exists

      if (!role || role === 'viewer') {
        // Call the server-side function from actions.ts
        await actions.updateUserRole(userId)
      }
    }

    assignUserRole()
  }, [user]) // Runs when the user changes

  const fetchQuestions = async () => {
    const questions = await actions.getAllQuestions()
    setQuestions(questions)
  }

  const addQuestion = async (quiz: string) => {
    await actions.createQuestion(quiz)
    fetchQuestions()
  }

  const editQuestion = async (id: number, newText: string) => {
    await actions.updateQuestion(id, newText)
    fetchQuestions()
  }

  const deleteQuestion = async (id: number) => {
    await actions.deleteQuestion(id)
    fetchQuestions()
  }

  const addAnswer = async (questionId: number, answer: string) => {
    await actions.createAnswer(answer, questionId)
    fetchQuestions()
  }

  const editAnswer = async (answerId: number, newText: string) => {
    await actions.updateAnswer(answerId, newText)
    fetchQuestions()
  }

  const deleteAnswer = async (answerId: number) => {
    await actions.deleteAnswer(answerId)
    fetchQuestions()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <QuestionForm onSubmit={addQuestion} />
        {Array.isArray(questions) && (
          <div className="space-y-4">
            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onEditQuestion={editQuestion}
                onDeleteQuestion={deleteQuestion}
                onAddAnswer={addAnswer}
                onEditAnswer={editAnswer}
                onDeleteAnswer={deleteAnswer}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
