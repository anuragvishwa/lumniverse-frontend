// components/ChatScreen.tsx
import { FC } from 'react';

const ChatScreen: FC = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-100">
      {/* Chat Header */}
      <div className="bg-blue-800 p-4 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">Talk with Acme</h1>
          <div className="space-x-2">
            <button className="rounded-md bg-blue-700 px-2 py-1">Chat</button>
            <button className="rounded-md bg-blue-700 px-2 py-1">
              Helpdesk
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* User Message */}
        <div className="text-right">
          <div className="my-2 inline-block rounded-lg bg-blue-500 p-2 text-white">
            Oh hello! I need help.
          </div>
          <div className="text-xs text-gray-500">Message read</div>
        </div>

        {/* Bot Message */}
        <div className="my-4">
          <div className="flex items-start space-x-2">
            <div className="rounded-lg bg-gray-200 p-2">
              <p className="text-gray-700">
                Please choose one of the topics listed below
              </p>

              {/* Buttons */}
              <div className="mt-2 space-y-2">
                <button className="flex w-full items-center justify-start rounded-md border border-blue-500 bg-white px-4 py-2 text-blue-500 hover:bg-blue-100">
                  <span role="img" aria-label="refund" className="mr-2">
                    🔄
                  </span>
                  Returns & Refund
                </button>
                <button className="flex w-full items-center justify-start rounded-md border border-blue-500 bg-white px-4 py-2 text-blue-500 hover:bg-blue-100">
                  <span role="img" aria-label="shipment" className="mr-2">
                    📦
                  </span>
                  Track Shipment
                </button>
                <button className="flex w-full items-center justify-start rounded-md border border-yellow-500 bg-white px-4 py-2 text-yellow-500 hover:bg-yellow-100">
                  <span role="img" aria-label="human" className="mr-2">
                    🤔
                  </span>
                  Talk with a human
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4">
        <input
          type="text"
          placeholder="Compose your message..."
          className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatScreen;
