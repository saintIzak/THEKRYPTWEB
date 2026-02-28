// M-Pesa Modal Test Component
// Use this to quickly test the modal improvements

import { useState } from 'react';
import MpesaPaymentModal from './MpesaPaymentModal';
import { Button } from './ui/button';

export default function MpesaModalTest() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl font-black text-white">M-Pesa Modal Test</h1>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Test Instructions:</h2>
                    <ol className="list-decimal list-inside space-y-2 text-zinc-400">
                        <li>Click the button below to open the M-Pesa modal</li>
                        <li>Verify the modal appears immediately without scrolling</li>
                        <li>Try scrolling the background - it should be locked</li>
                        <li>Test on mobile (resize browser to 375px width)</li>
                        <li>Verify all text is readable and buttons are tappable</li>
                        <li>Click outside the modal to close it</li>
                        <li>Verify scroll position is restored</li>
                    </ol>
                </div>

                <Button
                    onClick={() => setShowModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-black uppercase px-8 py-6 text-lg"
                >
                    Open M-Pesa Gateway
                </Button>

                {/* Add some content to make the page scrollable */}
                <div className="space-y-8 mt-16">
                    <h2 className="text-2xl font-bold text-white">Scroll Test Content</h2>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="bg-zinc-900 p-6 rounded border border-zinc-800">
                            <h3 className="text-xl font-bold text-white mb-2">Section {i + 1}</h3>
                            <p className="text-zinc-400">
                                This content is here to make the page scrollable. Scroll down, then open the modal.
                                The modal should appear in the viewport without requiring you to scroll to find it.
                                The background should also be locked and unscrollable while the modal is open.
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <MpesaPaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                amount={5000}
                orderId="test-order-123"
                customerName="Test User"
                customerPhone="0712345678"
                onPaymentComplete={(transactionId) => {
                    console.log('Payment completed:', transactionId);
                    setShowModal(false);
                }}
            />
        </div>
    );
}
