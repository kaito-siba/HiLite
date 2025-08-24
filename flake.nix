{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, flake-utils, rust-overlay, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ rust-overlay.overlays.default ];
        };
      in 
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_24
            pnpm
            git
            rust-bin.stable.latest.default
            gtk3
            libsoup_3
            webkitgtk_4_1
            pkg-config
            biome
          ];

          shellHook = ''
            export GDK_BACKEND=x11
            export WEBKIT_DISABLE_DMABUF_RENDERER=1
          '';
        };
      }
    );
}
