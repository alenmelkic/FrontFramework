# Manifest File

The `manifest.json` file provides metadata about the Kentico build.

## Location

```
../Web/wwwroot/dist/manifest.json
```

## Structure

```json
{
  "version": "1.0.0",
  "cssFramework": "bootstrap",
  "brand": "energia",
  "buildDate": "2024-12-13T14:00:00.000Z",
  "components": [...],
  "main": {...}
}
```

## Fields

### Top Level

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | FEFramework version |
| `cssFramework` | string | CSS framework used (always "bootstrap") |
| `brand` | string | Brand theme ("energia" or "powerni") |
| `buildDate` | string | ISO 8601 build timestamp |
| `components` | array | Array of component metadata |
| `main` | object | Main bundle metadata |

### Component Metadata

Each component in the `components` array:

```json
{
  "name": "Button",
  "files": {
    "js": "components/button/button.min.js",
    "css": "components/button/button.min.css"
  },
  "dependencies": ["react", "react-dom"],
  "size": {
    "js": 12450,
    "css": 3200
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Component name |
| `files.js` | string | Path to JavaScript bundle |
| `files.css` | string | Path to CSS bundle |
| `dependencies` | array | Required dependencies |
| `size.js` | number | JavaScript size in bytes |
| `size.css` | number | CSS size in bytes |

### Main Bundle Metadata

```json
{
  "js": "js/main.min.js",
  "css": "css/main.min.css",
  "size": {
    "js": 145000,
    "css": 48000
  }
}
```

## Usage

### Read Manifest in Kentico

```csharp
using System.IO;
using Newtonsoft.Json;

public class ManifestService
{
    public BuildManifest GetManifest()
    {
        var manifestPath = Server.MapPath("~/dist/manifest.json");
        var json = File.ReadAllText(manifestPath);
        return JsonConvert.DeserializeObject<BuildManifest>(json);
    }
}

public class BuildManifest
{
    public string Version { get; set; }
    public string CssFramework { get; set; }
    public string Brand { get; set; }
    public DateTime BuildDate { get; set; }
    public List<ComponentMetadata> Components { get; set; }
    public MainBundleMetadata Main { get; set; }
}
```

### Validate Build

```csharp
public bool ValidateBuild(string requiredBrand)
{
    var manifest = GetManifest();

    // Check brand matches
    if (manifest.Brand != requiredBrand)
    {
        throw new Exception($"Expected {requiredBrand} build, got {manifest.Brand}");
    }

    // Check all components present
    var requiredComponents = new[] { "Button", "Card", "Hero", "Navbar", "Footer" };
    var availableComponents = manifest.Components.Select(c => c.Name).ToList();

    foreach (var component in requiredComponents)
    {
        if (!availableComponents.Contains(component))
        {
            throw new Exception($"Missing component: {component}");
        }
    }

    return true;
}
```

### Dynamic Component Loading

```csharp
@{
    var manifest = new ManifestService().GetManifest();
    var buttonComponent = manifest.Components.First(c => c.Name == "Button");
}

<link rel="stylesheet" href="~/@buttonComponent.Files.Css" />
<script src="~/@buttonComponent.Files.Js"></script>
```

## Next Steps

- Learn about [Kentico usage](./usage)
- View [integration overview](./overview)
