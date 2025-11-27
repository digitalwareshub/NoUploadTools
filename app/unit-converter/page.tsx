"use client";

import { useState, useMemo } from "react";
import { AdPlaceholder } from "../../components/AdPlaceholder";

type Category =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "area"
  | "time"
  | "data";

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const UNITS: Record<Category, Unit[]> = {
  length: [
    { name: "Meters", symbol: "m", toBase: (v) => v, fromBase: (v) => v },
    {
      name: "Kilometers",
      symbol: "km",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000
    },
    {
      name: "Centimeters",
      symbol: "cm",
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100
    },
    {
      name: "Millimeters",
      symbol: "mm",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000
    },
    {
      name: "Miles",
      symbol: "mi",
      toBase: (v) => v * 1609.344,
      fromBase: (v) => v / 1609.344
    },
    {
      name: "Yards",
      symbol: "yd",
      toBase: (v) => v * 0.9144,
      fromBase: (v) => v / 0.9144
    },
    {
      name: "Feet",
      symbol: "ft",
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048
    },
    {
      name: "Inches",
      symbol: "in",
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254
    }
  ],
  weight: [
    { name: "Kilograms", symbol: "kg", toBase: (v) => v, fromBase: (v) => v },
    {
      name: "Grams",
      symbol: "g",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000
    },
    {
      name: "Milligrams",
      symbol: "mg",
      toBase: (v) => v / 1000000,
      fromBase: (v) => v * 1000000
    },
    {
      name: "Metric Tons",
      symbol: "t",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000
    },
    {
      name: "Pounds",
      symbol: "lb",
      toBase: (v) => v * 0.453592,
      fromBase: (v) => v / 0.453592
    },
    {
      name: "Ounces",
      symbol: "oz",
      toBase: (v) => v * 0.0283495,
      fromBase: (v) => v / 0.0283495
    },
    {
      name: "Stone",
      symbol: "st",
      toBase: (v) => v * 6.35029,
      fromBase: (v) => v / 6.35029
    }
  ],
  temperature: [
    { name: "Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
    {
      name: "Fahrenheit",
      symbol: "°F",
      toBase: (v) => (v - 32) * (5 / 9),
      fromBase: (v) => v * (9 / 5) + 32
    },
    {
      name: "Kelvin",
      symbol: "K",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15
    }
  ],
  volume: [
    { name: "Liters", symbol: "L", toBase: (v) => v, fromBase: (v) => v },
    {
      name: "Milliliters",
      symbol: "mL",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000
    },
    {
      name: "Cubic Meters",
      symbol: "m³",
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000
    },
    {
      name: "Gallons (US)",
      symbol: "gal",
      toBase: (v) => v * 3.78541,
      fromBase: (v) => v / 3.78541
    },
    {
      name: "Quarts (US)",
      symbol: "qt",
      toBase: (v) => v * 0.946353,
      fromBase: (v) => v / 0.946353
    },
    {
      name: "Pints (US)",
      symbol: "pt",
      toBase: (v) => v * 0.473176,
      fromBase: (v) => v / 0.473176
    },
    {
      name: "Cups (US)",
      symbol: "cup",
      toBase: (v) => v * 0.236588,
      fromBase: (v) => v / 0.236588
    },
    {
      name: "Fluid Ounces (US)",
      symbol: "fl oz",
      toBase: (v) => v * 0.0295735,
      fromBase: (v) => v / 0.0295735
    }
  ],
  area: [
    {
      name: "Square Meters",
      symbol: "m²",
      toBase: (v) => v,
      fromBase: (v) => v
    },
    {
      name: "Square Kilometers",
      symbol: "km²",
      toBase: (v) => v * 1000000,
      fromBase: (v) => v / 1000000
    },
    {
      name: "Hectares",
      symbol: "ha",
      toBase: (v) => v * 10000,
      fromBase: (v) => v / 10000
    },
    {
      name: "Acres",
      symbol: "ac",
      toBase: (v) => v * 4046.86,
      fromBase: (v) => v / 4046.86
    },
    {
      name: "Square Feet",
      symbol: "ft²",
      toBase: (v) => v * 0.092903,
      fromBase: (v) => v / 0.092903
    },
    {
      name: "Square Yards",
      symbol: "yd²",
      toBase: (v) => v * 0.836127,
      fromBase: (v) => v / 0.836127
    },
    {
      name: "Square Miles",
      symbol: "mi²",
      toBase: (v) => v * 2590000,
      fromBase: (v) => v / 2590000
    }
  ],
  time: [
    { name: "Seconds", symbol: "s", toBase: (v) => v, fromBase: (v) => v },
    {
      name: "Milliseconds",
      symbol: "ms",
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000
    },
    {
      name: "Minutes",
      symbol: "min",
      toBase: (v) => v * 60,
      fromBase: (v) => v / 60
    },
    {
      name: "Hours",
      symbol: "hr",
      toBase: (v) => v * 3600,
      fromBase: (v) => v / 3600
    },
    {
      name: "Days",
      symbol: "day",
      toBase: (v) => v * 86400,
      fromBase: (v) => v / 86400
    },
    {
      name: "Weeks",
      symbol: "wk",
      toBase: (v) => v * 604800,
      fromBase: (v) => v / 604800
    },
    {
      name: "Years",
      symbol: "yr",
      toBase: (v) => v * 31536000,
      fromBase: (v) => v / 31536000
    }
  ],
  data: [
    { name: "Bytes", symbol: "B", toBase: (v) => v, fromBase: (v) => v },
    {
      name: "Kilobytes",
      symbol: "KB",
      toBase: (v) => v * 1024,
      fromBase: (v) => v / 1024
    },
    {
      name: "Megabytes",
      symbol: "MB",
      toBase: (v) => v * 1048576,
      fromBase: (v) => v / 1048576
    },
    {
      name: "Gigabytes",
      symbol: "GB",
      toBase: (v) => v * 1073741824,
      fromBase: (v) => v / 1073741824
    },
    {
      name: "Terabytes",
      symbol: "TB",
      toBase: (v) => v * 1099511627776,
      fromBase: (v) => v / 1099511627776
    },
    {
      name: "Bits",
      symbol: "bit",
      toBase: (v) => v / 8,
      fromBase: (v) => v * 8
    }
  ]
};

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight / Mass",
  temperature: "Temperature",
  volume: "Volume",
  area: "Area",
  time: "Time",
  data: "Digital Storage"
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState("");

  const units = UNITS[category];

  const result = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return "";
    }

    const from = units[fromUnit];
    const to = units[toUnit];

    const baseValue = from.toBase(numValue);
    const converted = to.fromBase(baseValue);

    // Format with appropriate precision
    if (
      Math.abs(converted) >= 1000000 ||
      (Math.abs(converted) < 0.0001 && converted !== 0)
    ) {
      return converted.toExponential(6);
    }
    return converted.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, fromUnit, toUnit, units]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setFromUnit(0);
    setToUnit(1);
    setValue("");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Unit Converter
        </h1>
        <p className="mt-2 text-gray-700">
          Convert between units of length, weight, temperature, volume, and
          more. All calculations happen in your browser.
        </p>
      </header>

      <AdPlaceholder label="Top ad space" />

      <div className="space-y-4">
        {/* Category selection */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(UNITS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-md text-sm ${
                category === cat
                  ? "bg-black text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Converter */}
        <div className="border border-gray-300 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <label
                htmlFor="from-unit"
                className="block text-sm font-medium text-gray-700"
              >
                From
              </label>
              <select
                id="from-unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {units.map((unit, i) => (
                  <option key={i} value={i}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-lg font-mono"
              />
            </div>

            {/* Swap button */}
            <div className="flex justify-center py-2">
              <button
                onClick={swapUnits}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
                title="Swap units"
              >
                ⇄
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label
                htmlFor="to-unit"
                className="block text-sm font-medium text-gray-700"
              >
                To
              </label>
              <select
                id="to-unit"
                value={toUnit}
                onChange={(e) => setToUnit(parseInt(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                {units.map((unit, i) => (
                  <option key={i} value={i}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
              <div className="w-full border border-gray-300 rounded-md px-3 py-3 text-lg font-mono bg-gray-50 min-h-[52px]">
                {result || <span className="text-gray-400">Result</span>}
              </div>
            </div>
          </div>

          {/* Conversion formula */}
          {value && result && (
            <div className="text-center text-sm text-gray-600 pt-2 border-t">
              {value} {units[fromUnit].symbol} = {result} {units[toUnit].symbol}
            </div>
          )}
        </div>

        {/* Quick conversions */}
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <h2 className="text-sm font-semibold">
            Common {CATEGORY_LABELS[category]} Conversions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {category === "length" && (
              <>
                <div>1 mile = 1.60934 kilometers</div>
                <div>1 foot = 30.48 centimeters</div>
                <div>1 inch = 2.54 centimeters</div>
                <div>1 meter = 3.28084 feet</div>
              </>
            )}
            {category === "weight" && (
              <>
                <div>1 pound = 0.453592 kilograms</div>
                <div>1 kilogram = 2.20462 pounds</div>
                <div>1 ounce = 28.3495 grams</div>
                <div>1 stone = 14 pounds</div>
              </>
            )}
            {category === "temperature" && (
              <>
                <div>0°C = 32°F = 273.15K</div>
                <div>100°C = 212°F = 373.15K</div>
                <div>-40°C = -40°F</div>
                <div>37°C = 98.6°F (body temp)</div>
              </>
            )}
            {category === "volume" && (
              <>
                <div>1 gallon = 3.78541 liters</div>
                <div>1 liter = 4.22675 cups</div>
                <div>1 cup = 236.588 mL</div>
                <div>1 fluid ounce = 29.5735 mL</div>
              </>
            )}
            {category === "area" && (
              <>
                <div>1 acre = 4046.86 m²</div>
                <div>1 hectare = 2.47105 acres</div>
                <div>1 square mile = 640 acres</div>
                <div>1 square foot = 0.0929 m²</div>
              </>
            )}
            {category === "time" && (
              <>
                <div>1 day = 86,400 seconds</div>
                <div>1 week = 604,800 seconds</div>
                <div>1 year = 365.25 days</div>
                <div>1 hour = 3,600 seconds</div>
              </>
            )}
            {category === "data" && (
              <>
                <div>1 KB = 1,024 bytes</div>
                <div>1 MB = 1,024 KB</div>
                <div>1 GB = 1,024 MB</div>
                <div>1 byte = 8 bits</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 text-sm">
          <strong>🔒 Privacy First:</strong> All calculations happen in your
          browser. No data is sent to any server.
        </p>
      </div>

      <AdPlaceholder label="Bottom ad space" />

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">How to Use</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Select a measurement category (length, weight, etc.)</li>
          <li>Choose the unit you&apos;re converting from</li>
          <li>Enter the value to convert</li>
          <li>Select the unit you want to convert to</li>
          <li>View the result instantly</li>
        </ol>
      </section>

      <section className="space-y-3 text-sm text-gray-700">
        <h2 className="text-xl font-semibold">About Unit Conversion</h2>
        <p>
          This converter supports both metric (SI) and imperial/US customary
          units. Temperature conversion uses exact formulas (not approximations)
          for precision. All other conversions use internationally recognized
          conversion factors.
        </p>
        <p>
          For digital storage, this tool uses binary prefixes where 1 KB = 1024
          bytes (traditionally used by operating systems), not decimal prefixes
          where 1 KB = 1000 bytes (used by storage manufacturers).
        </p>
      </section>
    </div>
  );
}
