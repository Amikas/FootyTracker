'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Suspense } from 'react';

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Signin':
        return 'Try signing in with a different account.';
      case 'OAuthSignin':
        return 'Try signing in with a different account.';
      case 'OAuthCallback':
        return 'Try signing in with a different account.';
      case 'OAuthCreateAccount':
        return 'Try signing in with a different account.';
      case 'EmailCreateAccount':
        return 'Try signing in with a different account.';
      case 'Callback':
        return 'Try signing in with a different account.';
      case 'OAuthAccountNotLinked':
        return 'To confirm your identity, sign in with the same account you used originally.';
      case 'EmailSignin':
        return 'Check your email address.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'Unable to sign in.';
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-lg px-8 py-12">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
          <p className="mb-4 text-gray-600">{getErrorMessage(error)}</p>
          <Button asChild className="w-full">
            <Link href="/login">
              Try Again
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}