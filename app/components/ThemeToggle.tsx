import React from 'react'
import {Sun, Moon} from 'lucide-react'
import {useFetcher, useLoaderData} from '@remix-run/react'

export default function ThemeToggle() {
  const cookieToggle = useFetcher()
  const {themePreference} = useLoaderData()

  const isDarkMode = themePreference === `dark`

  return (
    <cookieToggle.Form method="post" action="/resource/toggle-theme">
      <button type="submit" disabled={cookieToggle.state === 'submitting'}>
        {isDarkMode ? (
          <Sun className="h-auto w-full md:w-5" />
        ) : (
          <Moon className="h-auto w-full md:w-5" />
        )}
        <div className="sr-only select-none">{isDarkMode ? `Light` : `Dark`} Mode</div>
      </button>
    </cookieToggle.Form>
  )
}
