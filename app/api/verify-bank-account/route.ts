import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accountNumber, bankCode } = await request.json();

    if (!accountNumber || !bankCode) {
      return NextResponse.json(
        {
          success: false,
          message: "Account number and bank code are required",
        },
        { status: 400 },
      );
    }

    if (!/^\d{10}$/.test(accountNumber)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid account number format. Must be 10 digits.",
        },
        { status: 400 },
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockAccounts: Record<string, string> = {
      "0222229922": "AAT INSURANCE LIMITED",
      "0123456789": "JOHN DOE ENTERPRISES",
      "0987654321": "JANE SMITH TRADING",
      "1234567890": "TEST COMPANY LIMITED",
      "0000000000": "SAMPLE BUSINESS NAME",
    };

    const accountName = mockAccounts[accountNumber];

    if (accountName) {
      return NextResponse.json({
        success: true,
        accountName: accountName,
        accountNumber: accountNumber,
        bankCode: bankCode,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Could not verify account details. Account not found.",
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Mock verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while verifying account details",
      },
      { status: 500 },
    );
  }
}
