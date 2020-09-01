export const Content: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-2xl p-4">{children}</div>
    </div>
  )
}
