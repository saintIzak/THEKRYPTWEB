export interface MpesaPaymentRequest {
  amount: number;
  phoneNumber: string;
  orderId: string;
  customerName: string;
}

export interface MpesaPaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  checkoutRequestId?: string;
}

export class MpesaService {
  private tillNumber: string;
  private businessName: string;

  constructor() {
    this.tillNumber = import.meta.env.VITE_MPESA_TILL_NUMBER || '';
    this.businessName = import.meta.env.VITE_MPESA_BUSINESS_NAME || 'THE KRYPT';
  }

  // Format phone number to M-Pesa format (254XXXXXXXXX)
  private formatPhoneNumber(phone: string): string {
    let formatted = phone.replace(/\s+/g, '').replace(/[^\d]/g, '');

    if (formatted.startsWith('0')) {
      formatted = '254' + formatted.substring(1);
    } else if (formatted.startsWith('+254')) {
      formatted = formatted.substring(1);
    } else if (!formatted.startsWith('254')) {
      formatted = '254' + formatted;
    }

    return formatted;
  }

  // Validate phone number
  private isValidPhoneNumber(phone: string): boolean {
    const formatted = this.formatPhoneNumber(phone);
    return /^254[17]\d{8}$/.test(formatted);
  }

  // Generate payment instructions for Till Number
  generatePaymentInstructions(request: MpesaPaymentRequest): {
    success: boolean;
    instructions: string;
    tillNumber: string;
    amount: number;
    reference: string;
  } {


    if (!this.isValidPhoneNumber(request.phoneNumber)) {
      return {
        success: false,
        instructions: 'Invalid phone number format. Please use format: 0700000000 or +254700000000',
        tillNumber: this.tillNumber,
        amount: request.amount,
        reference: request.orderId
      };
    }

    const instructions = `
To complete your payment:

1. Go to M-Pesa on your phone
2. Select "Lipa na M-Pesa"
3. Select "Buy Goods and Services"
4. Enter Till Number: ${this.tillNumber}
5. Enter Amount: KSh ${request.amount.toLocaleString()}
6. Enter your M-Pesa PIN
7. Confirm the payment

Reference: ${request.orderId}
Business: ${this.businessName}

You will receive an SMS confirmation once payment is successful.
    `.trim();

    return {
      success: true,
      instructions,
      tillNumber: this.tillNumber,
      amount: request.amount,
      reference: request.orderId
    };
  }

  // Simulate STK Push (Lipa Na M-Pesa Online)
  async initiateStkPush(request: MpesaPaymentRequest): Promise<MpesaPaymentResponse> {
    const formattedPhone = this.formatPhoneNumber(request.phoneNumber);

    if (!this.isValidPhoneNumber(request.phoneNumber)) {
      return {
        success: false,
        message: 'Invalid phone number format. Use 07... or 2547...',
      };
    }

    try {
      // In a real production app, this would be an API call to your backend
      // and your backend would authenticate with Safaricom Daraja API
      // to trigger the STK push to the selected number.

      // Simulating API network request delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      return {
        success: true,
        message: 'STK Push sent successfully. Please check your phone to enter your PIN.',
        checkoutRequestId: `ws_CO_${Date.now()}_${request.orderId}`
      };
    } catch (error) {
      console.error('STK Push error:', error);
      return {
        success: false,
        message: 'Failed to initiate STK Push. Please try again.'
      };
    }
  }

  // Simulate Check STK Push Status Callback
  async checkStkStatus(checkoutRequestId: string): Promise<{ success: boolean; status: 'PENDING' | 'COMPLETED' | 'FAILED' }> {
    // Simulating callback wait time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, this polls your database for the Safaricom callback
    return {
      success: true,
      status: 'COMPLETED'
    };
  }

  // Check if Till Number is configured
  isConfigured(): boolean {
    return !!this.tillNumber && this.tillNumber !== '<your-till-number>';
  }

  getTillNumber(): string {
    return this.tillNumber;
  }

  getBusinessName(): string {
    return this.businessName;
  }
}

export const mpesaService = new MpesaService();