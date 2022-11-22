import ThemeToggle from '~/components/ThemeToggle'
import Logo from '~/components/Logo'

export default function Header() {
  return (
    <header className="border-b border-gray-100 dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo />
        <ThemeToggle />
      </div>
    </header>
  )
}
