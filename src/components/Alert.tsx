
import { AlertCircle, FileWarning, Terminal } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type Props = {
  errorMessage: string
}

export function AlertDestructive({errorMessage}: Props) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {errorMessage}
      </AlertDescription>
    </Alert>
  )
}
