"use client";

import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";
import { Breadcrumbs } from "../../components/Breadcrumbs";

const COMMON_PASSWORDS = [
  "password",
  "123456",
  "12345678",
  "qwerty",
  "abc123",
  "monkey",
  "1234567",
  "letmein",
  "trustno1",
  "dragon",
  "baseball",
  "iloveyou",
  "master",
  "sunshine",
  "ashley",
  "bailey",
  "shadow",
  "123123",
  "654321",
  "superman",
  "qazwsx",
  "michael",
  "football",
  "password1",
  "password123",
  "batman",
  "login",
  "admin",
  "welcome",
  "hello",
  "charlie",
  "donald",
  "password1!",
  "qwerty123",
  "123456789",
  "1234567890",
  "0987654321",
  "pass",
  "test",
  "guest",
  "master123",
  "changeme",
  "123qwe",
  "zaq1zaq1",
  "mustang",
  "access",
  "love",
  "god",
  "secret"
];

const KEYBOARD_PATTERNS = [
  "qwerty",
  "qwertyuiop",
  "asdfgh",
  "asdfghjkl",
  "zxcvbn",
  "zxcvbnm",
  "qazwsx",
  "1qaz2wsx",
  "1234qwer"
];

interface PasswordAnalysis {
  score: number;
  strength: "very-weak" | "weak" | "fair" | "strong" | "very-strong";
  crackTime: string;
  issues: string[];
  suggestions: string[];
  details: {
    length: number;
    hasLower: boolean;
    hasUpper: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
    isCommon: boolean;
    hasPattern: boolean;
    hasRepeating: boolean;
    entropy: number;
  };
}

export default function SecurePasswordCheckerPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo((): PasswordAnalysis | null => {
    if (!password) {
      return null;
    }

    const lower = password.toLowerCase();
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const isCommon = COMMON_PASSWORDS.some(
      (p) => lower === p || lower.includes(p)
    );
    const hasKeyboardPattern = KEYBOARD_PATTERNS.some((p) => lower.includes(p));
    const hasSequential =
      /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
        password
      );
    const hasRepeating = /(.)\1{2,}/.test(password);
    const hasPattern = hasKeyboardPattern || hasSequential;

    // Calculate character pool size
    let poolSize = 0;
    if (hasLower) {
      poolSize += 26;
    }
    if (hasUpper) {
      poolSize += 26;
    }
    if (hasNumber) {
      poolSize += 10;
    }
    if (hasSymbol) {
      poolSize += 32;
    }

    // Calculate entropy
    const entropy = password.length * Math.log2(Math.max(poolSize, 1));

    // Calculate score (0-100)
    let score = 0;

    // Length scoring
    if (password.length >= 8) {
      score += 15;
    }
    if (password.length >= 12) {
      score += 15;
    }
    if (password.length >= 16) {
      score += 10;
    }
    if (password.length >= 20) {
      score += 5;
    }

    // Character diversity
    if (hasLower) {
      score += 10;
    }
    if (hasUpper) {
      score += 10;
    }
    if (hasNumber) {
      score += 10;
    }
    if (hasSymbol) {
      score += 15;
    }

    // Entropy bonus
    if (entropy >= 40) {
      score += 5;
    }
    if (entropy >= 60) {
      score += 5;
    }

    // Penalties
    if (isCommon) {
      score -= 40;
    }
    if (hasPattern) {
      score -= 20;
    }
    if (hasRepeating) {
      score -= 10;
    }
    if (password.length < 8) {
      score -= 20;
    }

    score = Math.max(0, Math.min(100, score));

    // Determine strength
    let strength: PasswordAnalysis["strength"];
    if (score < 20) {
      strength = "very-weak";
    } else if (score < 40) {
      strength = "weak";
    } else if (score < 60) {
      strength = "fair";
    } else if (score < 80) {
      strength = "strong";
    } else {
      strength = "very-strong";
    }

    // Calculate crack time (simplified estimation)
    const guessesPerSecond = 1e10; // 10 billion guesses/second (GPU cluster)
    const combinations = Math.pow(poolSize || 1, password.length);
    const seconds = combinations / guessesPerSecond / 2; // Average case

    let crackTime: string;
    if (isCommon) {
      crackTime = "Instantly";
    } else if (seconds < 1) {
      crackTime = "Less than a second";
    } else if (seconds < 60) {
      crackTime = `${Math.round(seconds)} seconds`;
    } else if (seconds < 3600) {
      crackTime = `${Math.round(seconds / 60)} minutes`;
    } else if (seconds < 86400) {
      crackTime = `${Math.round(seconds / 3600)} hours`;
    } else if (seconds < 31536000) {
      crackTime = `${Math.round(seconds / 86400)} days`;
    } else if (seconds < 31536000 * 100) {
      crackTime = `${Math.round(seconds / 31536000)} years`;
    } else if (seconds < 31536000 * 1000000) {
      crackTime = `${Math.round(seconds / 31536000 / 1000)} thousand years`;
    } else if (seconds < 31536000 * 1e9) {
      crackTime = `${Math.round(seconds / 31536000 / 1e6)} million years`;
    } else {
      crackTime = "Billions of years";
    }

    // Issues and suggestions
    const issues: string[] = [];
    const suggestions: string[] = [];

    if (password.length < 8) {
      issues.push("Password is too short");
      suggestions.push("Use at least 12-16 characters");
    } else if (password.length < 12) {
      suggestions.push("Consider using 12+ characters for better security");
    }

    if (!hasLower) {
      issues.push("No lowercase letters");
      suggestions.push("Add lowercase letters (a-z)");
    }
    if (!hasUpper) {
      issues.push("No uppercase letters");
      suggestions.push("Add uppercase letters (A-Z)");
    }
    if (!hasNumber) {
      issues.push("No numbers");
      suggestions.push("Add numbers (0-9)");
    }
    if (!hasSymbol) {
      issues.push("No special characters");
      suggestions.push("Add symbols (!@#$%^&*)");
    }

    if (isCommon) {
      issues.push("This is a commonly used password");
      suggestions.push("Avoid common passwords and dictionary words");
    }
    if (hasPattern) {
      issues.push("Contains predictable patterns");
      suggestions.push("Avoid keyboard patterns and sequences");
    }
    if (hasRepeating) {
      issues.push("Contains repeating characters");
      suggestions.push("Avoid repeating the same character");
    }

    if (suggestions.length === 0) {
      suggestions.push("Great password! Consider using a password manager");
    }

    return {
      score,
      strength,
      crackTime,
      issues,
      suggestions,
      details: {
        length: password.length,
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        isCommon,
        hasPattern,
        hasRepeating,
        entropy: Math.round(entropy)
      }
    };
  }, [password]);

  const getStrengthColor = (strength: PasswordAnalysis["strength"]) => {
    switch (strength) {
      case "very-weak":
        return "bg-red-500";
      case "weak":
        return "bg-orange-500";
      case "fair":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      case "very-strong":
        return "bg-emerald-600";
    }
  };

  const getStrengthLabel = (strength: PasswordAnalysis["strength"]) => {
    switch (strength) {
      case "very-weak":
        return "Very Weak";
      case "weak":
        return "Weak";
      case "fair":
        return "Fair";
      case "strong":
        return "Strong";
      case "very-strong":
        return "Very Strong";
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/directory" },
          { name: "Password Checker" }
        ]}
      />
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Secure Password Checker
        </h1>
        <p className="mt-2 text-gray-700">
          Check your password strength with detailed security analysis. All
          checking happens in your browser - your password is never sent
          anywhere.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Password input */}
        <div>
          <label
            htmlFor="password-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Password to Check
          </label>
          <div className="relative">
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here..."
              className="w-full border border-gray-300 rounded-md px-3 py-3 pr-12 text-lg font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Analysis results */}
        {analysis && (
          <div className="space-y-4">
            {/* Strength meter */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Password Strength</span>
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${getStrengthColor(analysis.strength)}`}
                >
                  {getStrengthLabel(analysis.strength)}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor(analysis.strength)}`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Score: {analysis.score}/100</span>
                <span>Crack time: {analysis.crackTime}</span>
              </div>
            </div>

            {/* Character analysis */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                className={`p-3 rounded-lg text-center ${analysis.details.hasLower ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
              >
                <div className="text-2xl">
                  {analysis.details.hasLower ? "✓" : "✗"}
                </div>
                <div className="text-xs mt-1">Lowercase</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${analysis.details.hasUpper ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
              >
                <div className="text-2xl">
                  {analysis.details.hasUpper ? "✓" : "✗"}
                </div>
                <div className="text-xs mt-1">Uppercase</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${analysis.details.hasNumber ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
              >
                <div className="text-2xl">
                  {analysis.details.hasNumber ? "✓" : "✗"}
                </div>
                <div className="text-xs mt-1">Numbers</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${analysis.details.hasSymbol ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}
              >
                <div className="text-2xl">
                  {analysis.details.hasSymbol ? "✓" : "✗"}
                </div>
                <div className="text-xs mt-1">Symbols</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Issues */}
              {analysis.issues.length > 0 && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">⚠️ Issues</h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    {analysis.issues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  💡 Suggestions
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {analysis.suggestions.map((suggestion, i) => (
                    <li key={i}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Technical Details</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Length</span>
                  <p className="font-mono font-medium">
                    {analysis.details.length} chars
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Entropy</span>
                  <p className="font-mono font-medium">
                    {analysis.details.entropy} bits
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Common Password</span>
                  <p className="font-medium">
                    {analysis.details.isCommon ? "Yes ⚠️" : "No ✓"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">Patterns Found</span>
                  <p className="font-medium">
                    {analysis.details.hasPattern ? "Yes ⚠️" : "No ✓"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips section */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-lg font-semibold">Password Best Practices</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>✓ Use at least 12-16 characters (longer is better)</li>
            <li>✓ Mix uppercase, lowercase, numbers, and symbols</li>
            <li>✓ Use unique passwords for each account</li>
            <li>
              ✓ Consider using a passphrase (e.g.,
              &quot;correct-horse-battery-staple&quot;)
            </li>
            <li>✓ Use a password manager to generate and store passwords</li>
            <li>✗ Avoid personal information (names, birthdays)</li>
            <li>✗ Avoid common words and predictable patterns</li>
            <li>✗ Never reuse passwords across accounts</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> Your password is analyzed entirely
          in your browser. It is never sent to any server, logged, or stored
          anywhere.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Type or paste your password in the input field</li>
          <li>View the real-time strength analysis</li>
          <li>Review issues and improvement suggestions</li>
          <li>Adjust your password based on the feedback</li>
          <li>Use the toggle button to show/hide your password</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Password Security</h2>
        <p>
          Password strength is measured by how long it would take an attacker to
          guess your password. This depends on length, character variety, and
          randomness. A longer password with diverse characters exponentially
          increases the number of possible combinations.
        </p>
        <p>
          Modern attackers use powerful GPUs that can test billions of passwords
          per second. They also use dictionaries of common passwords and
          patterns. A truly random 16-character password is virtually impossible
          to crack, while common 8-character passwords can be broken in minutes.
        </p>
      </section>

      {/* FAQ */}
      <section className="space-y-2 text-sm text-gray-700">
        <h2 className="text-base font-semibold tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div>
            <p className="font-semibold">
              Is it safe to enter my password in this checker?
            </p>
            <p>
              Yes, this password checker runs entirely in your browser. Your
              password is never sent to any server or stored anywhere. All
              analysis happens locally on your device using JavaScript.
            </p>
          </div>

          <div>
            <p className="font-semibold">What makes a password strong?</p>
            <p>
              A strong password is at least 12-16 characters long, contains a
              mix of uppercase, lowercase, numbers, and symbols, doesn&apos;t
              use dictionary words or common patterns, and is unique to each
              account. Avoid personal information like birthdays or names.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              How does the password strength calculation work?
            </p>
            <p>
              The checker analyzes multiple factors: length, character variety
              (uppercase, lowercase, numbers, symbols), common patterns (like
              &apos;123&apos;, &apos;abc&apos;), dictionary words, and known
              weak passwords. Each factor contributes to the overall score.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              What are common password patterns to avoid?
            </p>
            <p>
              Avoid sequential characters (123, abc), keyboard patterns (qwerty,
              asdf), repeated characters (aaa, 111), common substitutions
              (p@ssw0rd), dictionary words, personal information, and previously
              breached passwords.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              How long would it take to crack my password?
            </p>
            <p>
              Crack time depends on password complexity and attack method. A
              simple 8-character password can be cracked in hours. A
              16-character random password with mixed characters could take
              billions of years. This tool estimates crack time based on
              brute-force attack assumptions.
            </p>
          </div>

          <div>
            <p className="font-semibold">Should I use a password manager?</p>
            <p>
              Yes, password managers are highly recommended. They generate and
              store unique, complex passwords for each account, so you only need
              to remember one master password. This is much more secure than
              reusing passwords or using simple memorable passwords.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
