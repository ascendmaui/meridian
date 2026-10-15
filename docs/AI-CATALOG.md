# AI Resource Catalog (ai-catalog.json)

The Meridian project includes an AI Resource Catalog file (`ai-catalog.json`) to enable discovery by AI agents and registries. This file follows the Agent Description Record (ARD) schema and provides metadata about the Meridian globe experience for AI agents.

## File Location

- `/ai-catalog.json` (root directory)
- `/.well-known/ai-catalog.json` (well-known location for standardized discovery)

## Format

The AI catalog is a JSON file with the following structure:

```json
{
  "specVersion": "1.0",
  "host": {
    "displayName": "string",
    "identifier": "string (DID)",
    "documentationUrl": "string (URL)"
  },
  "entries": [
    {
      "identifier": "string (unique identifier for the resource)",
      "displayName": "string (human-readable name)",
      "type": "string (media type, e.g., application/ai-catalog+json)",
      "url": "string (URL where the resource can be accessed)",
      "representativeQueries": [
        "string (example queries that an agent might use to discover this resource)",
        "..."
      ],
      "trustManifest": {
        "identity": "string (domain or identifier for trust verification)"
      }
    }
  ]
}
```

## Fields

### specVersion
The version of the ARD schema used. Currently "1.0".

### host
Information about the host providing the resource.

- `displayName`: A human-readable name for the host (e.g., "Ascend Maui").
- `identifier`: A decentralized identifier (DID) for the host (e.g., "did:web:ascendmaui.example.com").
- `documentationUrl`: A URL to documentation about the host.

### entries
An array of resource entries. Each entry describes a discoverable resource.

- `identifier`: A unique identifier for the resource (e.g., a URN).
- `displayName`: A human-readable name for the resource.
- `type`: The media type of the resource (for Meridian, this is "application/ai-catalog+json").
- `url`: The URL where the resource can be accessed (e.g., "http://localhost:8080/").
- `representativeQueries`: An array of example queries that an AI agent might use to discover this resource.
- `trustManifest`: Information for trust verification.
  - `identity`: The domain or identifier associated with the resource for trust purposes.

## Purpose

The AI catalog allows AI agents to discover and understand the capabilities of the Meridian globe experience. By providing structured metadata, AI agents can:

1. Determine what the resource is and what it does.
2. Understand how to interact with the resource (via the URL and representative queries).
3. Verify the trustworthiness of the resource (via the trustManifest).

## Usage

The Meridian server automatically serves the AI catalog with the correct content type (`application/ai-catalog+json`) for requests to `/ai-catalog.json` and `/.well-known/ai-catalog.json`.

AI agents can discover the catalog by:
- Making a request to `http://<host>/ai-catalog.json`
- Making a request to `http://<host>/.well-known/ai-catalog.json` (standard well-known location)

## Example

See the [`ai-catalog.json`](../ai-catalog.json) file in the root directory for a concrete example.

## Related Resources

- [Agent Description Record (ARD) Schema](https://github.com/ai-agent-registry/ard-schema) (external link)
- [Well-Known URLs](https://www.rfc-editor.org/rfc/rfc5785) (RFC 5785)

