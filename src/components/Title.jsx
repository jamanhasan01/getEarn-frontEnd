const Title = ({title,subtitle}) => {
  return (
    <div className="flex flex-col items-center gap-5 mb-10">
        <h2 className="text-4xl font-bold text-secondary dark:text-white text-center">{title}</h2>
        <p className="w-full md:w-3/6 text-center">{subtitle}</p>
    </div>
  )
}

export default Title