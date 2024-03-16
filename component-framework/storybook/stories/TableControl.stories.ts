import type { Meta, StoryObj } from "@storybook/html";
import type { IInputs, IOutputs } from "./Components/TableControl";

import resource from "raw-loader!!../../TableControl/TableControl/strings/TableControl.1033.resx";

import { useArgs, useEffect } from "@storybook/preview-api";
import { TableControl as Component } from "./Components/TableControl";
import {
  ComponentFrameworkMockGenerator,
  StringPropertyMock,
} from "@shko.online/componentframework-mock";
import "../../TableControl/TableControl/css/TableControl.css";

export default {
  title: "PowerApps Samples/TableControl",
} as Meta<StoryArgs>;

interface StoryArgs {
  isDisabled: boolean;
  isVisible: boolean;
}

const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args] = useArgs<StoryArgs>();
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement("div");
      container.className = "SampleNamespace.TableControl";
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          stringProperty: StringPropertyMock,
        },
        container
      );
      mockGenerator.SetControlResource(resource);
      mockGenerator.context.userSettings.userName = 'Betim Beja';
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.utils.lookupObjects.callsFake(
        (lookupOptions: ComponentFramework.UtilityApi.LookupOptions) => {
          return new Promise<ComponentFramework.LookupValue[]>((resolve) => {
            resolve([
              {
                entityType: lookupOptions.entityTypes
                  ? lookupOptions.entityTypes[0]
                  : "account",
                id: "00000000-0000-0000-0000-000000000004",
                name: "Account",
              },
            ]);
          });
        }
      );
    

      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;

      mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

export const TableControl = {
  render: renderGenerator(),
  args: {
   
  },
} as StoryObj<StoryArgs>;
