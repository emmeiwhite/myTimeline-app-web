const ChatInput = () => {
  return (
    <form className="h-24 bg-blue-200 border-t border-gray-300 p-4 flex items-center gap-4">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/* Submit Button */}
      <button
        type="submit"
        className="h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
        Send
      </button>
    </form>
  )
}

export default ChatInput
