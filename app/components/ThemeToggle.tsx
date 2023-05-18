import {useFetcher, useLoaderData} from '@remix-run/react'
import {Moon, Sun} from 'lucide-react'

export function ThemeToggle() {
  const cookieToggle = useFetcher()
  const {themePreference} = useLoaderData()

  const isDarkMode = themePreference === `dark`

  return (
    <cookieToggle.Form method="post" action="/resource/toggle-theme">
      <button type="submit" disabled={cookieToggle.state === 'submitting'}>
        {isDarkMode ? (
          <Sun className="h-auto w-4" />
        ) : (
          <Moon className="h-auto w-4" />
        )}
        <div className="sr-only select-none">
          {isDarkMode ? `Light` : `Dark`} Mode
        </div>
      </button>
    </cookieToggle.Form>
  )
}
