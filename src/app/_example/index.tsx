"use client";
import Input from "@/components/core/input";
import Button from "@/components/core/button";
import React from "react";
import TextArea from "@/components/core/textArea";
import Dropdown from "@/components/core/dropdown";

function Example() {
  const [inputValue1, setInputValue1] = React.useState({
    sm: "",
    md: "",
    lg: "",
  });

  const [inputValue2, setInputValue2] = React.useState({
    primary: "",
    secondary: "",
    error: "",
  });
  const [dropdownValue1, setDropdownValue1] = React.useState({
    sm: null,
    md: null,
    lg: null,
  });

  const [dropdownValue2, setDropdownValue2] = React.useState({
    primary: null,
    secondary: null,
    error: null,
  });

  const dropdownOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  return (
    <div className=" bg-gradient-to-br w-full ">
      <div className="w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Component Showcase
          </h1>
          <p className="text-gray-600">Preview of all UI components</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Sizes Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Input Sizes
              </h2>
              <p className="text-sm text-gray-600">
                Small, Medium, and Large input variations
              </p>
            </div>

            <div className="space-y-6">
              <Input
                value={inputValue1.sm}
                setter={(val) =>
                  setInputValue1((prev) => ({ ...prev, sm: val }))
                }
                label="Small Input"
                placeholder="Small size"
                size="sm"
              />

              <Input
                value={inputValue1.md}
                setter={(val) =>
                  setInputValue1((prev) => ({ ...prev, md: val }))
                }
                label="Medium Input"
                placeholder="Medium size"
                size="md"
              />

              <Input
                value={inputValue1.lg}
                setter={(val) =>
                  setInputValue1((prev) => ({ ...prev, lg: val }))
                }
                label="Large Input"
                placeholder="Large size"
                size="lg"
              />
            </div>
          </div>

          {/* Input Variants Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Input Variants
              </h2>
              <p className="text-sm text-gray-600">
                Primary, Secondary, and Error states
              </p>
            </div>

            <div className="space-y-6">
              <Input
                value={inputValue2.primary}
                setter={(val) =>
                  setInputValue2((prev) => ({ ...prev, primary: val }))
                }
                label="Primary Variant"
                placeholder="Primary variant"
                variant="primary"
              />

              <Input
                value={inputValue2.secondary}
                setter={(val) =>
                  setInputValue2((prev) => ({ ...prev, secondary: val }))
                }
                label="Secondary Variant"
                placeholder="Secondary variant"
                variant="secondary"
              />

              <Input
                value={inputValue2.error}
                setter={(val) =>
                  setInputValue2((prev) => ({ ...prev, error: val }))
                }
                label="Error Variant"
                placeholder="Error variant"
                variant="error"
                error={inputValue2.error ? "This is an error message." : ""}
              />
            </div>
          </div>

          {/* Button Sizes Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Button Sizes
              </h2>
              <p className="text-sm text-gray-600">
                Different button size options
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Button size="sm" variant="primary">
                  Primary Small
                </Button>
                <span className="text-sm text-gray-500">sm</span>
              </div>

              <div className="flex items-center gap-3">
                <Button size="md" variant="primary">
                  Primary Medium
                </Button>
                <span className="text-sm text-gray-500">md</span>
              </div>

              <div className="flex items-center gap-3">
                <Button size="lg" variant="primary">
                  Primary Large
                </Button>
                <span className="text-sm text-gray-500">lg</span>
              </div>
            </div>
          </div>

          {/* Button Variants Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Button Variants
              </h2>
              <p className="text-sm text-gray-600">
                Different button style options
              </p>
            </div>

            <div className="space-y-4 grid  grid-cols-2">
              <div className="flex items-center gap-3">
                <Button size="md" variant="primary">
                  Primary
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button size="md" variant="primary-bordered">
                  Primary Bordered
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button size="md" variant="secondary">
                  Secondary
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button size="md" variant="secondary-bordered">
                  Secondary Bordered
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button size="md" variant="danger">
                  Error Button
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button size="md" variant="primary" disabled>
                  Disabled Button
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl   shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                TexArea Variants
              </h2>
              <p className="text-sm text-gray-600">
                Primary, Secondary, and Error states
              </p>
            </div>

            <div className="space-y-6">
              <TextArea
                value={inputValue2.primary}
                setter={(val) =>
                  setInputValue2((prev) => ({ ...prev, primary: val }))
                }
                label="Primary Variant"
                placeholder="Primary variant"
                variant="primary"
              />

              <TextArea
                value={inputValue2.secondary}
                setter={(val) =>
                  setInputValue2((prev) => ({ ...prev, secondary: val }))
                }
                label="Secondary Variant"
                placeholder="Secondary variant"
                variant="secondary"
              />

              <TextArea
                value={inputValue2.error}
                setter={(val) =>
                  setInputValue2((prev) => ({ ...prev, error: val }))
                }
                label="Error Variant"
                placeholder="Error variant"
                variant="error"
                error={inputValue2.error ? "This is an error message." : ""}
              />
            </div>
          </div>

          {/* Dropdown Sizes Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dropdown Sizes
              </h2>
              <p className="text-sm text-gray-600">
                Small, Medium, and Large dropdown variations
              </p>
            </div>

            <div className="space-y-6">
              <Dropdown
                value={dropdownValue1.sm}
                setter={(val) =>
                  setDropdownValue1((prev) => ({ ...prev, sm: val }))
                }
                options={dropdownOptions}
                label="Small Dropdown"
                placeholder="Select small size"
                size="sm"
              />

              <Dropdown
                value={dropdownValue1.md}
                setter={(val) =>
                  setDropdownValue1((prev) => ({ ...prev, md: val }))
                }
                options={dropdownOptions}
                label="Medium Dropdown"
                placeholder="Select medium size"
                size="md"
              />

              <Dropdown
                value={dropdownValue1.lg}
                setter={(val) =>
                  setDropdownValue1((prev) => ({ ...prev, lg: val }))
                }
                options={dropdownOptions}
                label="Large Dropdown"
                placeholder="Select large size"
                size="lg"
              />
            </div>
          </div>

          {/* Dropdown Variants Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dropdown Variants
              </h2>
              <p className="text-sm text-gray-600">
                Primary, Secondary, and Error states
              </p>
            </div>

            <div className="space-y-6">
              <Dropdown
                value={dropdownValue2.primary}
                setter={(val) =>
                  setDropdownValue2((prev) => ({ ...prev, primary: val }))
                }
                options={dropdownOptions}
                label="Primary Variant"
                placeholder="Primary variant"
                variant="primary"
              />

              <Dropdown
                value={dropdownValue2.secondary}
                setter={(val) =>
                  setDropdownValue2((prev) => ({ ...prev, secondary: val }))
                }
                options={dropdownOptions}
                label="Secondary Variant"
                placeholder="Secondary variant"
                variant="secondary"
              />

              <Dropdown
                value={dropdownValue2.error}
                setter={(val) =>
                  setDropdownValue2((prev) => ({ ...prev, error: val }))
                }
                options={dropdownOptions}
                label="Error Variant"
                placeholder="Error variant"
                variant="error"
                error={dropdownValue2.error ? "This is an error message." : ""}
              />
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Interact with the components to see them in action
          </p>
        </div>
      </div>
    </div>
  );
}

export default Example;
