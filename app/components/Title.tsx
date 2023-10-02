type TitleProps = {
  data: {
    title?: string | null
  } | null
}

export function Title({data}: TitleProps) {
  return data?.title ? (
    <h1 className="text-bold max-w-4xl text-4xl font-bold tracking-tighter md:text-4xl lg:text-5xl xl:text-8xl">
      {data.title}
    </h1>
  ) : null
}
