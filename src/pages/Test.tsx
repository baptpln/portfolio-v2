import { useRef } from 'react';

export const Test = () => {
  const hapticSwitchRef = useRef<HTMLInputElement>(null);

  const triggerHaptic = () => {
    if (hapticSwitchRef.current) {
      hapticSwitchRef.current.click();
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-4 md:inset-8 bg-black flex justify-center items-center rounded-3xl border border-white/20 text-white">
        <div className="flex flex-col gap-8 max-w-2xl p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-7xl font-bold">Safari Haptic Test</h1>
            <p className="text-lg md:text-xl text-gray-400">
              Testing the switch input haptic feedback hack
            </p>
          </div>

          <div className="flex flex-col gap-4 border border-white/20 rounded-2xl p-6 bg-white/5">
            <h2 className="text-2xl font-semibold">Le hack de l'input "switch"</h2>
            <p className="text-gray-300 leading-relaxed">
              Sur Safari récent (iOS 18 / macOS Sequoia), l'élément{' '}
              <code className="bg-white/10 px-2 py-1 rounded text-sm">&lt;input type="checkbox" switch&gt;</code>{' '}
              déclenche un léger "tic" haptique système lorsqu'il est basculé.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <button
                onClick={triggerHaptic}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform active:scale-95"
              >
                Trigger Haptic Feedback
              </button>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-400">Visible switch (try toggling):</span>
                <input
                  type="checkbox"
                  // @ts-ignore - switch is experimental
                  switch="true"
                  className="w-12 h-6"
                />
              </div>

              <p className="text-sm text-gray-500">
                Note: This only works on Safari iOS 18+ or macOS Sequoia+. On other browsers, you won't feel any haptic feedback.
              </p>
            </div>
          </div>

          {/* Hidden switch for programmatic haptic trigger */}
          <input
            ref={hapticSwitchRef}
            type="checkbox"
            // @ts-ignore - switch is experimental
            switch="true"
            className="hidden"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
