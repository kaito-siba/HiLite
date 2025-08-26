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
            gsettings-desktop-schemas glib dconf   # ← 追加
          ];

          shellHook = ''
            export GDK_BACKEND=x11
            export WEBKIT_DISABLE_DMABUF_RENDERER=1
            # GSettings の探索パスを通す（NixOSは自動でやらない）
            export XDG_DATA_DIRS=${pkgs.gsettings-desktop-schemas}/share:${pkgs.gtk3}/share:${pkgs.glib}/share:/run/current-system/sw/share:$XDG_DATA_DIRS
            export GIO_EXTRA_MODULES=${pkgs.glib}/lib/gio/modules
          '';
        };
      }
    );
}
