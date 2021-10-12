enum SPlatform {
  Win = "Win",
  Mac = "Mac",
  Linux = "Linux",
  Other = "Other",
}

interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
  minimize: VoidFunction;
  maximize: VoidFunction;
  close: VoidFunction;
  restore: VoidFunction;
  getPlatform: () => string;
  isMaximised: () => Promise<boolean>;
  isFullscreen: () => Promise<boolean>;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
}
